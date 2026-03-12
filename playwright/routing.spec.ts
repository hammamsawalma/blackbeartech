import { test, expect } from '@playwright/test';

test.describe('i18n Routing & Language Switching', () => {
  
  test('Root path resolves to default locale (Arabic)', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // The URL should remain at the root
    await expect(page).toHaveURL(/.*\/$/);
    
    // It should render Arabic content by default
    const html = page.locator('html');
    await expect(html).toHaveAttribute('lang', 'ar');
  });

  test('Arabic rendering on root page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const html = page.locator('html');
    await expect(html).toHaveAttribute('dir', 'rtl');
    await expect(html).toHaveAttribute('lang', 'ar');
  });

  test('English page has correct dir and lang', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    
    const html = page.locator('html');
    await expect(html).toHaveAttribute('dir', 'ltr');
    await expect(html).toHaveAttribute('lang', 'en');
  });

  test('English page renders English content', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    
    // Hero should have English text
    await expect(page.getByText('Every Business Has a Problem.').first()).toBeVisible();
    await expect(page.getByText('We Engineer the Fix.').first()).toBeVisible();
    
    // Services section
    await expect(page.getByText('How We Help').first()).toBeVisible();
    
    // Footer
    await expect(page.getByText('All Rights Reserved').first()).toBeVisible();
  });

  test('Language switcher AR→EN works', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Click EN button
    await page.getByRole('button', { name: 'Switch to English' }).click();
    
    // Wait for navigation to /en
    await page.waitForURL(/\/en/, { timeout: 10000 });
    
    const html = page.locator('html');
    await expect(html).toHaveAttribute('dir', 'ltr');
    await expect(html).toHaveAttribute('lang', 'en');
    
    // Verify English content loads
    await expect(page.getByText('Every Business Has a Problem.').first()).toBeVisible();
  });

  test('Language switcher EN→AR works', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    
    // In English, switcher shows عربي
    await page.getByRole('button', { name: 'التحويل للعربية' }).click();
    
    // Wait for navigation to / (Arabic root)
    await page.waitForURL((url) => new URL(url).pathname === '/', { timeout: 10000 });
    
    const html = page.locator('html');
    await expect(html).toHaveAttribute('dir', 'rtl');
    await expect(html).toHaveAttribute('lang', 'ar');
  });

  test('Invalid locale shows 404 page', async ({ page }) => {
    await page.goto('/xyz', { waitUntil: 'networkidle' });
    // Should show 404 or redirect
    const url = page.url();
    const is404OrRedirect = url.includes('/en') || url.includes('/ar') || 
      (await page.locator('text=404').count()) > 0;
    expect(is404OrRedirect).toBeTruthy();
  });
});
