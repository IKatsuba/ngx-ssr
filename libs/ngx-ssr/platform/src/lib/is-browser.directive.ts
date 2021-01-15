import {
  Directive,
  Inject,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { IS_BROWSER_PLATFORM } from './tokens';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[isBrowser]',
})
export class IsBrowserDirective {
  constructor(
    @Inject(IS_BROWSER_PLATFORM) isBrowser: boolean,
    templateRef: TemplateRef<any>,
    viewContainer: ViewContainerRef
  ) {
    if (isBrowser) {
      viewContainer.createEmbeddedView(templateRef);
    }
  }
}
