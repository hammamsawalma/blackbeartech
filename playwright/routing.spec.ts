import { test, expect } from '@playwright/test';

test.describe('i18n Routing', () => {
  test('Root path redirects to English based on browser locale', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/en/);
    
    // Check if direction is LTR
    const htmlDir = await page.locator('html').getAttribute('dir');
    expect(htmlDir).toBe('ltr');
    
    // Check heading language
    await expect(page.locator('h1').first()).toContainText('Your Business Problems?');
  });

  test('English path loads LTR text', async ({ page }) => {
    await page.goto('/en');
    
    // Check if direction is LTR
    const htmlDir = await page.locator('html').getAttribute('dir');
    expect(htmlDir).toBe('ltr');
    
    // Check heading language
    await expect(page.locator('h1').first()).toContainText('Your Business Problems?');
  });

  test('Language switcher changes language and direction', async ({ page }) => {
    await page.goto('/ar');
    
    // Click language switcher (EN button)
    // Assuming the switcher has text "EN"
    await page.getByRole('button', { name: 'EN' }).click();
    
    // Wait for navigation
    await page.waitForURL(/\/en/);
    
    // Should be english now
    const htmlDir = await page.locator('html').getAttribute('dir');
    expect(htmlDir).toBe('ltr');
    await expect(page.locator('h1').first()).toContainText('Your Business Problems?');
    
    // Switch back to AR
    await page.getByRole('button', { name: 'عربي' }).click();
    await page.waitForURL(/\/ar/);
    
    const htmlDirAr = await page.locator('html').getAttribute('dir');
    expect(htmlDirAr).toBe('rtl');
    await expect(page.locator('h1').first()).toContainText('مشاكل عملك؟');
  });
});
