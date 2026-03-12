import { test, expect } from '@playwright/test';

test.describe('DiagnosticWizard — Full Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('Complete wizard flow: retail → manual → recommendation', async ({ page }) => {
    // Step 1: Business type selection
    await expect(page.getByText('ما طبيعة عملك؟').first()).toBeVisible();
    
    // Select "تجارة / محلات"
    await page.getByText('تجارة / محلات').click();
    
    // Step 2: Challenge selection
    await expect(page.getByText('ما أكبر تحدٍّ تواجهه الآن؟').first()).toBeVisible({ timeout: 5000 });
    
    // Select "أعمال يدوية كثيرة تأخذ وقتي"
    await page.getByText('أعمال يدوية كثيرة تأخذ وقتي').click();
    
    // Result: recommendation
    await expect(page.getByText('إليك ما نوصي به لك:').first()).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('نظام الأتمتة الذكية').first()).toBeVisible();
    
    // WhatsApp CTA
    const waLink = page.locator('a[href*="wa.me"]').first();
    await expect(waLink).toBeVisible();
    await expect(waLink).toHaveAttribute('href', /wa\.me/);
    await expect(page.getByText('ابدأ محادثة على واتساب').first()).toBeVisible();
    
    // Free note
    await expect(page.getByText('استشارة مجانية').first()).toBeVisible();
  });

  test('Back button from step 2 returns to step 1', async ({ page }) => {
    // Go to step 2
    await page.getByText('تجارة / محلات').click();
    await expect(page.getByText('ما أكبر تحدٍّ تواجهه الآن؟').first()).toBeVisible({ timeout: 5000 });
    
    // Click back
    await page.getByText('رجوع').first().click();
    
    // Should be back at step 1
    await expect(page.getByText('ما طبيعة عملك؟').first()).toBeVisible({ timeout: 5000 });
  });

  test('Back from result resets wizard', async ({ page }) => {
    // Complete the flow
    await page.getByText('خدمات / شركة').click();
    await page.getByText('أعمال يدوية كثيرة تأخذ وقتي').click();
    await expect(page.getByText('إليك ما نوصي به لك:').first()).toBeVisible({ timeout: 5000 });
    
    // Click back from result
    await page.getByText('رجوع').first().click();
    
    // Should reset to step 1
    await expect(page.getByText('ما طبيعة عملك؟').first()).toBeVisible({ timeout: 5000 });
  });

  test('All 6 business types are clickable', async ({ page }) => {
    const types = ['تجارة / محلات', 'مقاولات / مشاريع', 'خدمات / شركة', 'أريد أبيع أونلاين', 'تصنيع / إنتاج', 'غير ذلك'];
    for (const type of types) {
      await expect(page.getByText(type).first()).toBeVisible();
    }
    
    // Click last type and verify transition
    await page.getByText('غير ذلك').click();
    await expect(page.getByText('ما أكبر تحدٍّ تواجهه الآن؟').first()).toBeVisible({ timeout: 5000 });
  });

  test('All 5 challenges are rendered in step 2', async ({ page }) => {
    await page.getByText('تجارة / محلات').click();
    await expect(page.getByText('ما أكبر تحدٍّ تواجهه الآن؟').first()).toBeVisible({ timeout: 5000 });
    
    const challenges = [
      'أعمال يدوية كثيرة تأخذ وقتي',
      'ما أعرف أرقام عملي بوضوح',
      'أريد أوصل لعملاء أكثر أونلاين',
      'بياناتي غير محمية وقلقان',
      'صعب أنسق مع فريقي الموزع',
    ];
    for (const challenge of challenges) {
      await expect(page.getByText(challenge).first()).toBeVisible();
    }
  });

  test('Different challenges lead to different recommendations', async ({ page }) => {
    // Test manual → Smart Automation
    await page.getByText('تجارة / محلات').click();
    await page.getByText('أعمال يدوية كثيرة تأخذ وقتي').click();
    await expect(page.getByText('نظام الأتمتة الذكية').first()).toBeVisible({ timeout: 5000 });
    
    // Go back and try data challenge
    await page.getByText('رجوع').first().click();
    await page.getByText('تجارة / محلات').click();
    await page.getByText('ما أعرف أرقام عملي بوضوح').click();
    // Should show a different recommendation
    await expect(page.getByText('لوحة تحكم ذكية لعملك').first()).toBeVisible({ timeout: 5000 });
  });

  // ─── English Wizard ───
  test('Wizard works in English', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    
    // Step1Title from EN i18n: "What's your business type?"
    await expect(page.getByText(/business type/i).first()).toBeVisible();
    
    await page.getByText('Retail / Shops').click();
    // Step2Title: "What's your biggest challenge right now?"
    await expect(page.getByText(/biggest challenge/i).first()).toBeVisible({ timeout: 5000 });
    
    await page.getByText('Too much manual work eating my time').click();
    await expect(page.getByText('Smart Automation System').first()).toBeVisible({ timeout: 5000 });
  });
});
