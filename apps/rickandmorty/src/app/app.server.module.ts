import { NgModule } from '@angular/core';
import {
  ServerModule,
  ServerTransferStateModule,
} from '@angular/platform-server';
import { UNIVERSAL_ANIMATION_FRAME } from '@ng-web-apis/universal';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { NgxSsrTimeoutModule } from '@ngx-ssr/timeout';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule,
    NgxSsrTimeoutModule.forRoot({ timeout: 500 }),
  ],
  bootstrap: [AppComponent],
  providers: [UNIVERSAL_ANIMATION_FRAME],
})
export class AppServerModule {}
