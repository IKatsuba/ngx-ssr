import { NgModule } from '@angular/core';
import {
  ServerModule,
  ServerTransferStateModule,
} from '@angular/platform-server';
import { UniversalModule } from '@ng-web-apis/universal';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { NgxSsrTimeoutModule } from '@ngx-ssr/timeout';

@NgModule({
  imports: [
    UniversalModule,
    AppModule,
    ServerModule,
    ServerTransferStateModule,
    NgxSsrTimeoutModule.forRoot({ timeout: 500 }),
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
