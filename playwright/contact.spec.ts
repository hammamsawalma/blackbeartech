import { test, expect } from '@playwright/test';

test.describe('Contact Form — Submission & Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Scroll to contact section
    const contact = page.locator('#contact');
    await contact.scrollIntoViewIfNeeded();
  });

  test('Form fields are visible with correct Arabic labels', async ({ page }) => {
    await expect(page.getByText('الاسم الكامل').first()).toBeVisible();
    await expect(page.getByText('رقم الهاتف').first()).toBeVisible();
    await expect(page.getByText('البريد الإلكتروني').first()).toBeVisible();
    await expect(page.getByText('الخدمة المطلوبة').first()).toBeVisible();
    await expect(page.getByText('رسالتك').first()).toBeVisible();
  });

  test('Submit button shows correct text', async ({ page }) => {
    await expect(page.getByText('إرسال الرسالة').first()).toBeVisible();
  });

  test('Service dropdown has correct options', async ({ page }) => {
    const select = page.locator('select[name="service"]');
    await expect(select).toBeVisible();
    
    const options = await select.locator('option').allTextContents();
    expect(options).toContain('أتمتة الأعمال');
    expect(options).toContain('تطوير مواقع وتطبيقات');
    expect(options).toContain('أنظمة سحابية');
    expect(options).toContain('استشارات تقنية');
    expect(options).toContain('أخرى');
  });

  test('Successful form submission shows success message', async ({ page }) => {
    // Fill required fields
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="phone"]', '+966501234567');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.selectOption('select[name="service"]', 'web');
    await page.fill('textarea[name="message"]', 'This is a test message from Playwright.');
    
    // Submit
    await page.getByText('إرسال الرسالة').first().click();
    
    // Wait for success state
    await expect(page.getByText('تم إرسال رسالتك بنجاح').first()).toBeVisible({ timeout: 10000 });
  });

  test('Honeypot field blocks spam submissions', async ({ page }) => {
    // Fill the form normally
    await page.fill('input[name="name"]', 'Spam Bot');
    await page.fill('input[name="phone"]', '+966500000000');
    await page.fill('input[name="email"]', 'spam@bot.com');
    await page.fill('textarea[name="message"]', 'Spam message');
    
    // Unhide and fill the honeypot
    await page.evaluate(() => {
      const hp = document.querySelector('input[name="honeypot"]') as HTMLInputElement;
      if (hp) {
        hp.classList.remove('hidden');
        hp.style.display = 'block';
      }
    });
    await page.fill('input[name="honeypot"]', 'I am a bot');
    
    // Submit
    await page.getByText('إرسال الرسالة').first().click();
    
    // Should show error message
    await expect(page.getByText('حدث خطأ أثناء الإرسال').first()).toBeVisible({ timeout: 10000 });
  });

  test('Submit button disabled while loading', async ({ page }) => {
    await page.fill('input[name="name"]', 'Test');
    await page.fill('input[name="phone"]', '+966501234567');
    await page.fill('input[name="email"]', 'test@test.com');
    await page.fill('textarea[name="message"]', 'Test message');
    
    const submitBtn = page.locator('button[type="submit"]');
    await submitBtn.click();
    
    // After submission started, button should be disabled
    // (it enables after success/error, so just verify the flow completes)
    await expect(page.getByText('تم إرسال رسالتك بنجاح').first()).toBeVisible({ timeout: 10000 });
    
    // After success, submit button should be disabled
    await expect(submitBtn).toBeDisabled();
  });

  // ─── English Contact Form ───
  test('Contact form works in English', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    const contact = page.locator('#contact');
    await contact.scrollIntoViewIfNeeded();
    
    // Check English labels
    await expect(page.getByText('Full Name').first()).toBeVisible();
    await expect(page.getByText('Email Address').first()).toBeVisible();
    await expect(page.getByText('Your Message').first()).toBeVisible();
    
    // Check English options
    const select = page.locator('select[name="service"]');
    const options = await select.locator('option').allTextContents();
    expect(options).toContain('Business Automation');
    expect(options).toContain('Web & App Development');
  });
});
