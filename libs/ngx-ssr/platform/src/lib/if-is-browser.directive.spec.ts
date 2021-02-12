import { IfIsBrowserDirective } from './if-is-browser.directive';
import { render, screen } from '@testing-library/angular';
import { IS_BROWSER_PLATFORM } from './tokens';

describe('IsBrowserDirective', () => {
  it('should create an element', async () => {
    await render(IfIsBrowserDirective, {
      template: '<div *ifIsBrowser>Some text</div>',
      providers: [
        {
          provide: IS_BROWSER_PLATFORM,
          useValue: true,
        },
      ],
    });

    expect(screen.getByText('Some text').outerHTML).toStrictEqual(
      '<div>Some text</div>'
    );
  });

  it('should not create an element', async () => {
    await render(IfIsBrowserDirective, {
      template: '<div *ifIsBrowser>Some text</div>',
      providers: [
        {
          provide: IS_BROWSER_PLATFORM,
          useValue: false,
        },
      ],
    });

    expect(() => screen.getByText('Some text')).toThrowError();
  });
});
