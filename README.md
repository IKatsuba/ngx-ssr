# ngx-ssr

`ngx-ssr` is a set of utilities for working with Angular Universal.

The project contains:

1. Three publishable libraries:
    - [@ngx-ssr/cache](./libs/ngx-ssr/cache/README.md) - in-memory implementation of the cache for GET requests and HTML. It is possible to change the
      storage.
    - [@ngx-ssr/timeout](./libs/ngx-ssr/timeout/README.md) — implementation of timeout for requests
    - [@ngx-ssr/platform](./libs/ngx-ssr/platform/README.md) — utilities for convenient work with platform-specific data
2. One side publishable library:
    - `ngx-rickandmorty`
3. [The Rick and Morty application](https://ng-rickandmorty.web.app/character) based on the Rick and Morty API. The
   application build artifact is deployed to Firebase Hosting. Using Firebase Function and Angular Universal, the
   application is rendered on the server.

All developed libraries are used in the application.

[Taiga UI](https://taiga-ui.dev/) is used as a UI framework.
