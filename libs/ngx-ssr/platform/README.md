# @ngx-ssr/platform

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
