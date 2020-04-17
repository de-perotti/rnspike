import { expect, device, element, by } from 'detox';

describe('Example', () => {
  beforeEach(async () => {
    await device.launchApp({ newInstance: true });
  });

  it('should have welcome screen', async () => {
    const textField = element(by.id('rolezao'));
    await expect(textField).toBeVisible();
  });
});
