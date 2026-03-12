import { test, expect } from '@playwright/test';

test.describe('Contact and Sub-Pages', () => {
  
  test('About page renders correctly', async ({ page }) => {
    await page.goto('/ar/about');
    await expect(page.locator('h1')).toContainText('من نحن');
    
    // Values should be visible
    await expect(page.getByText('البساطة').first()).toBeVisible();
    await expect(page.getByText('الموثوقية').first()).toBeVisible();
    await expect(page.getByText('الشراكة').first()).toBeVisible();
  });

  test('Solutions page renders correctly', async ({ page }) => {
    await page.goto('/ar/solutions');
    await expect(page.locator('h1')).toContainText('حلولنا التقنية');
    
    // Core services should be reused here
    await expect(page.getByText('كيف نساعدك؟').first()).toBeVisible();
  });

  test('Contact form submission works (Honeypot valid)', async ({ page }) => {
    await page.goto('/ar/contact');
    await expect(page.locator('h1')).toContainText('تواصل معنا');
    
    // Fill form
    await page.fill('input[name="name"]', 'Playwright Tester');
    await page.fill('input[name="phone"]', '+966500000000');
    await page.fill('input[name="email"]', 'test@blackbeartech.com');
    await page.selectOption('select[name="service"]', 'web');
    await page.fill('textarea[name="message"]', 'This is an automated test running on Playwright.');
    
    // Do NOT fill the honeypot
    
    // Submit
    await page.getByRole('button', { name: 'إرسال الرسالة' }).click();
    
    // Wait for success message
    await expect(page.getByText('تم إرسال رسالتك بنجاح!')).toBeVisible({ timeout: 10000 });
  });

  test('Contact form blocks spam submissions automatically (Honeypot invalid)', async ({ page }) => {
    await page.goto('/ar/contact');
    
    // Try to fill out the form
    await page.fill('input[name="name"]', 'Spam Bot');
    await page.fill('input[name="phone"]', '+966500000000');
    await page.fill('input[name="email"]', 'spam@bot.com');
    await page.fill('textarea[name="message"]', 'Spam message');
    
    // Unhide and explicitly fill the honeypot field
    await page.evaluate(() => {
        const hp = document.querySelector('input[name="honeypot"]') as HTMLInputElement;
        if (hp) hp.classList.remove('hidden');
    });
    
    await page.fill('input[name="honeypot"]', 'I am a bot');
    
    // Listen for the console warning
    let hpWarningFired = false;
    page.on('console', msg => {
        // Warning might be on the server, but API returns 400
    });
    
    // Submit
    await page.getByRole('button', { name: 'إرسال الرسالة' }).click();
    
    // Wait for error message
    await expect(page.getByText('حدث خطأ أثناء الإرسال')).toBeVisible({ timeout: 10000 });
  });
});
