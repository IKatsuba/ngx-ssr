
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
