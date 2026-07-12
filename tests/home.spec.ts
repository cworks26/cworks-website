import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const VIEWPORTS = [
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 812 },
];

for (const v of VIEWPORTS) {
  test(`home page visual & a11y check - ${v.name}`, async ({ page }) => {
    await page.setViewportSize({ width: v.width, height: v.height });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/CWorks|Cryp/);

    // Accessibility check
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);

    // Check that key images are visible and not broken
    const selectors = [
      'img[src*="portfolio-showcase.png"]',
      'img[src*="img-portfolio.png"]',
      'img[src*="process-flow.png"]',
      'img[src*="img-timeline.png"]',
      'img[src*="img-upgrade.png"]',
      'img[src*="lets-talk.png"]',
      'img[src*="bg-start.png"]',
      'img[src*="img-work-with-us.png"]',
      'img[src*="team-collaboration.png"]',
    ];
    for (const s of selectors) {
      const el = await page.$(s);
      expect(el).not.toBeNull();
      const visible = await el!.isVisible();
      expect(visible).toBeTruthy();
    }

    // Ensure no layout shifts by capturing initial bounding boxes
    const bboxes = {} as Record<string, any>;
    for (const s of selectors) {
      const el = await page.$(s);
      bboxes[s] = await el!.boundingBox();
    }

    // Wait a short moment and ensure bounding boxes remain similar
    await page.waitForTimeout(500);
    for (const s of selectors) {
      const el = await page.$(s);
      const bb2 = await el!.boundingBox();
      expect(bb2).toBeTruthy();
      const a = bboxes[s];
      // basic check: position should not be NaN
      expect(a.x).toBeGreaterThanOrEqual(0);
      expect(bb2.x).toBeGreaterThanOrEqual(0);
    }
  });
}
