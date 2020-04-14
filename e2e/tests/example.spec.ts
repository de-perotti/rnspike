import { expect, device, element, by } from 'detox';

describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.id('rolezao'))).toBeVisible();
  });

  it('should be possible to write to screen', async () => {
    const input = element(by.id('rolezao-text'));
    await expect(input).toBeVisible();
    await input.typeText('um role');

    const textValue = element(by.id('rolezao-value'));
    await expect(textValue).toHaveText('um role');
  });
});
