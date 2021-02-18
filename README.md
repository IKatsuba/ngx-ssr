# ngx-ssr

`ngx-ssr` is a set of utilities for working with Angular Universal.

The project contains:

1. Three publishable libraries:
    - `@ngx-ssr/cache` - in-memory implementation of the cache for GET requests and HTML. It is possible to change the
      storage.
    - `@ngx-ssr/timeout` — implementation of timeout for requests
    - `@ngx-ssr/platform` — utilities for convenient work with platform-specific data
2. One side publishable library:
    - `ngx-rickandmorty`
3. [The Rick and Morty application](https://ng-rickandmorty.web.app/character) based on the Rick and Morty API. The
   application build artifact is deployed to Firebase Hosting. Using Firebase Function and Angular Universal, the
   application is rendered on the server.

All developed libraries are used in the application.

[Taiga UI](https://taiga-ui.dev/) is used as a UI framework.

# How to use

## @ngx-ssr/cache

Install package

```bash
npm i @ngx-ssr/cache
```

Import the `NgxSsrCacheModule` module to cache all GET requests

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgxSsrCacheModule } from '@ngx-ssr/cache';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgxSsrCacheModule.configLruCache({ maxAge: 10 * 60_000, maxSize: 50 }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
```

HTML caching is also available for express

```ts
import { ngExpressEngine } from '@nguniversal/express-engine';
import { LRUCache } from '@ngx-ssr/cache';
import { withCache } from '@ngx-ssr/cache/express';

server.engine(
  'html',
  withCache(
    new LRUCache({ maxAge: 10 * 60_000, maxSize: 100 }),
    ngExpressEngine({
      bootstrap: AppServerModule,
    })
  )
);
```

## @ngx-ssr/timeout

Install package

```bash
npm i @ngx-ssr/timeout
```

Use `NgxSsrTimeoutModule` to set timeouts for all requests

```ts
import { NgModule } from '@angular/core';
import {
  ServerModule,
} from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { NgxSsrTimeoutModule } from '@ngx-ssr/timeout';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    NgxSsrTimeoutModule.forRoot({ timeout: 500 }),
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {
}
```

## @ngx-ssr/platform

Install package

```bash
npm i @ngx-ssr/platform
```

To determine the platform, use the tokens `IS_SERVER_PLATFORM` and `IS_BROWSER_PLATFORM`

```ts
@Directive({
  selector: '[some-directive]',
})
export class SomeDirective {
  constructor(
    @Inject(IS_SERVER_PLATFORM) isServer: boolean,
  ) {
    if (isServer) {
      viewContainer.createEmbeddedView(templateRef);
    }
  }
}
```

Use the `ifIsServer` and ` ifIsBrowser` structural directives in your template for rendering contents depending on the
platform:

```ts
@Component({
  selector: 'ram-root',
  template: '<some-сomp *ifIsServer"></some-сomp>',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
}
```
