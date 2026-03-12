import { test, expect } from '@playwright/test';

test.describe('Accessibility & Edge Cases', () => {

  // ─── Skip to Content ───
  test('Skip-to-content link appears on Tab', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Press Tab to trigger skip-to-content link
    await page.keyboard.press('Tab');
    
    const skipLink = page.locator('a.skip-to-content');
    await expect(skipLink).toBeFocused();
  });

  test('Main element has id="main"', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const main = page.locator('main#main');
    await expect(main).toBeVisible();
  });

  // ─── HTML Semantics ───
  test('Page has proper semantic structure', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Only one h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
    
    // Has footer
    const footer = page.locator('footer');
    await expect(footer.first()).toBeVisible();
    
    // Has nav
    const nav = page.locator('nav');
    await expect(nav.first()).toBeVisible();
  });

  // ─── Meta Tags ───
  test('Page has proper meta title and description', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const title = await page.title();
    expect(title.length).toBeGreaterThan(5);
    
    const metaDesc = page.locator('meta[name="description"]');
    const content = await metaDesc.getAttribute('content');
    expect(content).toBeTruthy();
    expect(content!.length).toBeGreaterThan(10);
  });

  // ─── Honeypot Field Hidden ───
  test('Honeypot field is hidden from users', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const honeypot = page.locator('input[name="honeypot"]');
    await expect(honeypot).toHaveCount(1);
    await expect(honeypot).toBeHidden();
  });

  // ─── Responsive: Mobile Viewport ───
  test('Mobile: hamburger menu appears on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const hamburger = page.locator('nav button[aria-label]').first();
    await expect(hamburger).toBeVisible();
  });

  test('Mobile: hamburger opens mobile menu overlay', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // The hamburger button
    const hamburger = page.locator('nav button.md\\:hidden');
    await expect(hamburger).toHaveAttribute('aria-expanded', 'false');
    
    // Click to open
    await hamburger.click();
    
    // After click, aria-expanded should be true and label changes to Close menu
    await expect(hamburger).toHaveAttribute('aria-expanded', 'true');
    await expect(hamburger).toHaveAttribute('aria-label', 'Close menu');
    
    // Click to close
    await hamburger.click();
    await expect(hamburger).toHaveAttribute('aria-expanded', 'false');
    await expect(hamburger).toHaveAttribute('aria-label', 'Open menu');
  });

  // ─── Edge Case: Multiple rapid language switches ───
  test('Rapid language switches do not break the page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Switch AR→EN→AR quickly
    await page.getByRole('button', { name: 'Switch to English' }).click();
    await page.waitForURL(/\/en/, { timeout: 10000 });
    
    await page.getByRole('button', { name: 'التحويل للعربية' }).click();
    await page.waitForURL((url) => new URL(url).pathname === '/', { timeout: 10000 });
    
    // Page should still be functional
    await expect(page.locator('h1').first()).toBeVisible();
    const html = page.locator('html');
    await expect(html).toHaveAttribute('dir', 'rtl');
  });

  // ─── Edge Case: Scroll-based section visibility ───
  test('Footer becomes visible when scrolled to', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    
    await expect(page.getByText('جميع الحقوق محفوظة').first()).toBeVisible();
  });

  // ─── WhatsApp Links ───
  test('All WhatsApp links have correct format', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const waLinks = page.locator('a[href*="wa.me"]');
    const count = await waLinks.count();
    expect(count).toBeGreaterThanOrEqual(1);
    
    for (let i = 0; i < count; i++) {
      const href = await waLinks.nth(i).getAttribute('href');
      expect(href).toMatch(/^https:\/\/wa\.me\//);
    }
  });

  // ─── English Full Page ───
  test('English page has hero and footer sections', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    
    // Hero
    await expect(page.locator('h1').first()).toBeVisible();
    await expect(page.getByText('Every Business Has a Problem.').first()).toBeVisible();
    
    // Footer
    await expect(page.getByText('All Rights Reserved').first()).toBeVisible();
  });
});
