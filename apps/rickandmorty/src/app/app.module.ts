import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Sanitizer } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransferHttpCacheModule } from '@nguniversal/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  iconsPathFactory,
  TUI_ICONS_PATH,
  TuiRootModule,
} from '@taiga-ui/core';
import { TUI_SANITIZER } from '@taiga-ui/cdk';
import { TuiTabsModule } from '@taiga-ui/kit';
import { NgxSsrCacheModule } from '@ngx-ssr/cache';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const unsafeSanitizer: Sanitizer = {
  sanitize: (_: any, value: any) => value,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    TransferHttpCacheModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    TuiRootModule,
    TuiTabsModule,
    NgxSsrCacheModule.configLruCache({ maxAge: 10 * 60_000, maxSize: 50 }),
    ServiceWorkerModule.register('safety-worker.js', {
      enabled: environment.production,
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: TUI_SANITIZER,
      useValue: unsafeSanitizer,
    },
    {
      provide: TUI_ICONS_PATH,
      useValue: iconsPathFactory('assets/taiga-ui/icons/'),
    },
  ],
})
export class AppModule {}
