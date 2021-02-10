import { CacheController } from '@ngx-ssr/cache';

export type ExpressRenderEngine = (
  filePath: string,
  options: { req: { originalUrl: string }; [key: string]: any },
  callback: (err?: Error | null | undefined, html?: string | undefined) => void
) => void;

export function withCache(
  cache: CacheController,
  engine: ExpressRenderEngine
): ExpressRenderEngine {
  return (
    filePath: string,
    options: { req: { originalUrl: string }; [key: string]: any },
    callback: (
      err?: Error | null | undefined,
      html?: string | undefined
    ) => void
  ) => {
    function runEngine() {
      engine(filePath, options, async (err, html) => {
        if (!err && originalUrl) {
          try {
            await cache.set(originalUrl, html).toPromise();
          } catch (e) {
            console.error(`Setting cache for url ${originalUrl} is failed`, e);
          }
        }

        callback(err, html);
      });
    }

    const originalUrl = options.req?.originalUrl;

    if (!originalUrl) {
      runEngine();
      return;
    }

    cache
      .get(originalUrl)
      .toPromise()
      .then((fromCache) => {
        if (fromCache) {
          callback(null, fromCache);
        } else {
          runEngine();
        }
      })
      .catch(runEngine);
  };
}
