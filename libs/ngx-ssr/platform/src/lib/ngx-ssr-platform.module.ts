import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IfIsBrowserDirective } from './if-is-browser.directive';
import { IfIsServerDirective } from './if-is-server.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [IfIsBrowserDirective, IfIsServerDirective],
  exports: [IfIsBrowserDirective, IfIsServerDirective],
})
export class NgxSsrPlatformModule {}
