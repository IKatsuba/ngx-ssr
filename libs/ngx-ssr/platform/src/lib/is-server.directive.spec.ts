import { IsServerDirective } from './is-server.directive';
import { render, screen } from '@testing-library/angular';
import { IS_SERVER_PLATFORM } from './tokens';

describe('IsServerDirective', () => {
  it('should create an element', async () => {
    await render(IsServerDirective, {
      template: '<div *isServer>Some text</div>',
      providers: [
        {
          provide: IS_SERVER_PLATFORM,
          useValue: true,
        },
      ],
    });

    expect(screen.getByText('Some text').outerHTML).toStrictEqual(
      '<div>Some text</div>'
    );
  });

  it('should not create an element', async () => {
    await render(IsServerDirective, {
      template: '<div *isServer>Some text</div>',
      providers: [
        {
          provide: IS_SERVER_PLATFORM,
          useValue: false,
        },
      ],
    });

    expect(() => screen.getByText('Some text')).toThrowError();
  });
});
