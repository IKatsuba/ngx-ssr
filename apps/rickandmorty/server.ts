import 'zone.js/dist/zone-node';
import '@ng-web-apis/universal/mocks';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import { Request } from 'express';
import { LRUCache } from '@ngx-ssr/cache';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const cache = new LRUCache({ maxAge: 10 * 60_000, maxSize: 100 });

  const server = express();
  const distFolder = join(process.cwd(), 'dist/apps/rickandmorty/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine(
    'html',
    async (
      filePath: string,
      options: { req: Request },
      callback: (
        err?: Error | null | undefined,
        html?: string | undefined
      ) => void
    ) => {
      const fromCache = await cache.get(options.req.originalUrl).toPromise();

      if (fromCache) {
        callback(null, fromCache);
      } else {
        ngExpressEngine({
          bootstrap: AppServerModule,
        })(filePath, options, async (err, html) => {
          if (!err) {
            await cache.set(options.req.originalUrl, html).toPromise();
          }

          callback(err, html);
        });
      }
    }
  );

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browsera
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    })
  );

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, {
      req,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
  });

  return server;
}

function run(): void {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
