import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsBrowserDirective } from './is-browser.directive';
import { IsServerDirective } from './is-server.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [IsBrowserDirective, IsServerDirective],
  exports: [IsBrowserDirective, IsServerDirective],
})
export class NgxSsrPlatformModule {}
