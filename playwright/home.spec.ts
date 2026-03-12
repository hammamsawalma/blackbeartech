import { test, expect } from '@playwright/test';

test.describe('Home Page Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ar');
  });

  test('Hero section renders correctly', async ({ page }) => {
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.getByText('خبراء التكنولوجيا • متاحون الآن')).toBeVisible();
    await expect(page.getByRole('link', { name: /نحل مشكلتك معاً/i }).first()).toBeVisible();
  });

  test('TrustBar renders with 4 indicators', async ({ page }) => {
    const trustBar = page.locator('.container').filter({ hasText: '99.9% وقت تشغيل' }).first();
    await expect(trustBar).toBeVisible();
    
    // Check for some texts
    await expect(page.getByText('+50 عميل يثق بنا')).toBeVisible();
    await expect(page.getByText('دعم 24/7')).toBeVisible();
  });

  test('CoreServices section renders 7 service cards', async ({ page }) => {
    await expect(page.getByText('كيف نساعدك؟').first()).toBeVisible();
    
    const services = [
      'أتمتة ذكية تعمل بدلاً عنك',
      'موقع أو تطبيق يمثل عملك أونلاين',
      'برنامج تستخدمه من أي مكان',
      'خبير تقني يخطط لمستقبلك الرقمي'
    ];
    
    for (const service of services) {
      await expect(page.getByText(service).first()).toBeVisible();
    }
  });

  test('DiagnosticWizard interactive flow works', async ({ page }) => {
    await expect(page.getByText('ما طبيعة عملك؟').first()).toBeVisible();
    
    // Step 1: Select a business type
    await page.getByText('تجارة / محلات').click();
    
    // Should transition to Step 2
    await expect(page.getByText('ما أكبر تحدٍّ تواجهه الآن؟').first()).toBeVisible();
    
    // Step 2: Select a challenge
    await page.getByText('أعمال يدوية كثيرة تأخذ وقتي').click();
    
    // Should transition to Step 3 (Recommendation)
    await expect(page.getByText('إليك ما نوصي به لك:').first()).toBeVisible();
    await expect(page.getByText('نظام الأتمتة الذكية').first()).toBeVisible();
    
    // Check WhatsApp CTA is present
    const waLink = page.getByRole('link', { name: /ابدأ محادثة على واتساب/i });
    await expect(waLink).toBeVisible();
    await expect(waLink).toHaveAttribute('href', /wa\.me/);
    
    // Click back button from result resets to step 1
    await page.getByRole('button', { name: 'رجوع' }).click();
    await expect(page.getByText('ما طبيعة عملك؟').first()).toBeVisible();
  });

  test('AltBrands section and Footer render', async ({ page }) => {
    // Brands
    await expect(page.getByText('عائلة بلاك بير').first()).toBeVisible();
    
    // Footer
    await expect(page.getByText('جميع الحقوق محفوظة').first()).toBeVisible();
  });
});
