import { test, expect, Page } from '@playwright/test';

/**
 * Sitecore D2C Website - Landing Page Test Suite
 * 
 * These tests verify critical functionality on the live Sitecore website.
 * All tests include screenshots for visual verification and debugging.
 * 
 * CONFIGURATION REQUIRED:
 * 1. Update the URLs below to match your actual Sitecore pages
 * 2. Update element selectors to match your website's structure
 * 3. Verify test data (emails, product IDs, etc.) are appropriate
 */

// ============================================================================
// CONFIGURATION - UPDATE THESE VALUES FOR YOUR WEBSITE
// ============================================================================

const URLS = {
  landingPage: 'https://www.kerastase.ca/en/special-offers.html',
  productPage: 'https://www.kerastase.ca/en/collections/nutritive/8h-magic-night-hair-serum.html',
  cart: '/cart',
  checkout: '/checkout',
};

const TEST_DATA = {
  email: 'test-automation@example.com',
};

// ============================================================================
// Helper: dismiss common cookie/privacy banners or overlays that block clicks
// ============================================================================
async function dismissCookieBanner(page: Page) {
  try {
    const btn = page.getByRole('button', { name: /accept|agree|close|dismiss|ok|accept all/i }).first();
    if (await btn.isVisible().catch(() => false)) {
      await btn.click().catch(() => {});
    }
  } catch (e) {
    // ignore if not present
  }
}

/**
 * Close common modals that appear after adding to cart (e.g., "Don't Wait" upsell)
 */
async function closePostAddModal(page: Page) {
  try {
    // Wait briefly for any dialog to appear
    const dialog = page.getByRole('dialog').first();
    if (await dialog.isVisible().catch(() => false)) {
      // Try common close buttons inside dialog
      const closeBtn = dialog.locator('button[aria-label="close"], button:has-text("Close"), button:has-text("×"), button:has-text("X"), .modal-close, .close').first();
      if (await closeBtn.isVisible().catch(() => false)) {
        await closeBtn.click().catch(() => {});
        return;
      }
    }

    // Fallback: try global close buttons
    const globalClose = page.locator('button[aria-label="close"], button:has-text("Close"), button:has-text("×"), button:has-text("X"), .modal-close, .close').first();
    if (await globalClose.isVisible().catch(() => false)) {
      await globalClose.click().catch(() => {});
      return;
    }
  } catch (e) {
    // ignore errors closing modal
  }
}

// ============================================================================
// TEST 1: Landing Page Loads
// ============================================================================

test('Landing Page Loads Successfully', async ({ page }) => {
  // Navigate to the landing page with network idle wait for stability
  await page.goto(URLS.landingPage, { waitUntil: 'networkidle', timeout: 30000 });
  await dismissCookieBanner(page);
  
  // Verify page title is not empty (indicates page loaded properly)
  const title = await page.title();
  expect(title).not.toBe('');
  console.log(`✓ Page title: "${title}"`);
  
  // Verify main heading is visible
  // NOTE: Update selector based on your page structure
  // Try to use semantic selectors first (getByRole), fallback to other methods
  const heading = page.locator('h1').first();
  await expect(heading).toBeVisible({ timeout: 10000 });
  const headingText = await heading.textContent();
  console.log(`✓ Main heading found: "${headingText}"`);
  
  // Take screenshot for visual regression testing
  await page.screenshot({ 
    path: 'playwright-report/screenshots/landing-page-loaded.png',
    fullPage: true 
  });
  console.log('✓ Screenshot saved: landing-page-loaded.png');
});

// ============================================================================
// TEST 2: Sign Up Form
// ============================================================================

test('Sign Up Form Submission Works', async ({ page }) => {
  // Navigate to landing page
  await page.goto(URLS.landingPage, { waitUntil: 'networkidle', timeout: 30000 });
  await dismissCookieBanner(page);
  
  // Locate and click the Sign Up button
  // Using multiple strategies to find the button (adapt to your website)
  const signUpButton = page.getByRole('button', { name: /sign up/i })
    .or(page.getByRole('link', { name: /sign up/i }))
    .or(page.locator('button:has-text("Sign Up")'))
    .first();
  
  await expect(signUpButton).toBeVisible({ timeout: 10000 });
  console.log('✓ Sign Up button found');
  
  await signUpButton.click();
  console.log('✓ Clicked Sign Up button');
  
  // Wait for form to appear (could be modal or separate page)
  await page.waitForTimeout(1000); // Brief wait for animations
  
  // Fill email field
  // Adapt selector based on your form structure
  const emailInput = page.getByLabel(/email/i)
    .or(page.getByPlaceholder(/email/i))
    .or(page.locator('input[type="email"]'))
    .first();
  
  await expect(emailInput).toBeVisible({ timeout: 10000 });
  await emailInput.fill(TEST_DATA.email);
  console.log(`✓ Filled email: ${TEST_DATA.email}`);
  
  // Take screenshot before submission
  await page.screenshot({ 
    path: 'playwright-report/screenshots/signup-form-filled.png',
    fullPage: true 
  });
  
  // Click submit button
  const submitButton = page.getByRole('button', { name: /submit|subscribe|join/i })
    .or(page.locator('button[type="submit"]'))
    .first();
  
  await submitButton.click();
  console.log('✓ Clicked submit button');
  
  // Wait for success message or redirect
  // Try multiple success indicators
  try {
    // Option 1: Success message appears
    const successMessage = page.locator('text=/success|thank you|subscribed|welcome/i').first();
    await successMessage.waitFor({ state: 'visible', timeout: 20000 });
    console.log('✓ Success message displayed');
  } catch (error) {
    // Option 2: Page redirects to confirmation page
    await page.waitForURL(/confirmation|thank-you|success/i, { timeout: 20000 });
    console.log('✓ Redirected to confirmation page');
  }
  
  // Take screenshot of success state
  await page.screenshot({ 
    path: 'playwright-report/screenshots/signup-success.png',
    fullPage: true 
  });
  console.log('✓ Screenshot saved: signup-success.png');
});

// ============================================================================
// TEST 3: Add to Cart
// ============================================================================

test('Add to Cart Functionality Works', async ({ page }) => {
  // Navigate to a product page
  await page.goto(URLS.productPage, { waitUntil: 'networkidle', timeout: 30000 });
  await dismissCookieBanner(page);
  
  console.log(`✓ Navigated to product page: ${URLS.productPage}`);
  
  // Wait for page to fully load
  await page.waitForLoadState('domcontentloaded');
  
  // Find and click "Add to Cart" button
  // Using flexible selectors to match common patterns
  const addToCartButton = page.getByRole('button', { name: /add to cart|add to bag|buy now/i })
    .or(page.locator('button:has-text("Add to Cart")'))
    .or(page.locator('[data-testid*="add-to-cart"]'))
    .first();
  
  await expect(addToCartButton).toBeVisible({ timeout: 10000 });
  console.log('✓ Add to Cart button found');
  
  // Take screenshot before adding to cart
  await page.screenshot({ 
    path: 'playwright-report/screenshots/product-page-before-add.png',
    fullPage: true 
  });
  
  // Click the button
  await addToCartButton.click();
  console.log('✓ Clicked Add to Cart button');
  
  // Wait briefly and close post-add modal if it appears
  await page.waitForTimeout(1000);
  await closePostAddModal(page);

  // Wait for cart to update - check for multiple indicators
  try {
    // Option 1: Cart count badge updates
    const cartBadge = page.locator('[data-testid*="cart-count"], .cart-count, .cart-badge').first();
    await expect(cartBadge).toBeVisible({ timeout: 10000 });
    const cartCount = await cartBadge.textContent();
    console.log(`✓ Cart count updated: ${cartCount}`);
  } catch (error) {
    // Option 2: Success popup/notification appears
    const notification = page.locator('text=/added to cart|item added/i').first();
    await expect(notification).toBeVisible({ timeout: 10000 });
    console.log('✓ Cart notification displayed');
  }
  
  // Take screenshot after adding to cart
  await page.screenshot({ 
    path: 'playwright-report/screenshots/product-added-to-cart.png',
    fullPage: true 
  });
  console.log('✓ Screenshot saved: product-added-to-cart.png');
});

// ============================================================================
// TEST 4: Checkout Flow
// ============================================================================

test('Checkout Page Loads with Order Summary', async ({ page }) => {
  // Navigate to landing page first
  await page.goto(URLS.landingPage, { waitUntil: 'networkidle', timeout: 30000 });
  await dismissCookieBanner(page);
  
  // Add a product to cart (simplified version)
  const addToCartButton = page.getByRole('button', { name: /add to cart|shop now|buy/i })
    .or(page.locator('button:has-text("Add to Cart")'))
    .first();
  
  // Check if we're on a product page or need to navigate
  const isAddToCartVisible = await addToCartButton.isVisible().catch(() => false);
  
  if (!isAddToCartVisible) {
    // Navigate to a product page if not already there
    await page.goto(URLS.productPage, { waitUntil: 'networkidle', timeout: 10000 });
    console.log('✓ Navigated to product page');
  }
  
  // Add product to cart
  const addButton = page.getByRole('button', { name: /add to cart|add to bag/i }).first();
  await expect(addButton).toBeVisible({ timeout: 10000 });
  await addButton.click();
  console.log('✓ Product added to cart');
  
  // Wait briefly and close post-add modal if it appears
  await page.waitForTimeout(1000);
  await closePostAddModal(page);

  // Wait for cart update
  await page.waitForTimeout(2000);
  
  // Navigate to checkout
  // Try multiple methods to reach checkout
  const checkoutButton = page.getByRole('button', { name: /checkout|proceed to checkout/i })
    .or(page.getByRole('link', { name: /checkout|proceed to checkout/i }))
    .or(page.locator('a[href*="checkout"]'))
    .first();
  
  // If checkout button not immediately visible, go to cart first
  const isCheckoutVisible = await checkoutButton.isVisible().catch(() => false);
  
  if (!isCheckoutVisible) {
    await page.goto(URLS.cart, { waitUntil: 'networkidle', timeout: 30000 });
    console.log('✓ Navigated to cart page');
    await page.waitForTimeout(1000);
  }
  
  // Click checkout button
  const checkoutBtn = page.getByRole('button', { name: /checkout|proceed/i })
    .or(page.getByRole('link', { name: /checkout|proceed/i }))
    .first();
  
  await expect(checkoutBtn).toBeVisible({ timeout: 5000 });
  await checkoutBtn.click();
  console.log('✓ Clicked checkout button');
  
  // Wait for checkout page to load
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(3000); // Allow for dynamic content
  
  // Verify checkout page loaded with order summary
  const orderSummary = page.locator('text=/order summary|your order|cart summary/i')
    .or(page.locator('[data-testid*="order-summary"]'))
    .or(page.locator('.order-summary, #order-summary'))
    .first();
  
  await expect(orderSummary).toBeVisible({ timeout: 20000 });
  console.log('✓ Order summary section found');
  
  // Verify payment section is present
  const paymentSection = page.locator('text=/payment|payment information|billing/i')
    .or(page.locator('[data-testid*="payment"]'))
    .or(page.locator('.payment, #payment'))
    .first();
  
  await expect(paymentSection).toBeVisible({ timeout: 10000 });
  console.log('✓ Payment information section found');
  
  // Take screenshot of checkout page
  await page.screenshot({ 
    path: 'playwright-report/screenshots/checkout-page.png',
    fullPage: true 
  });
  console.log('✓ Screenshot saved: checkout-page.png');
});

// ============================================================================
// TEST 5: Mobile Responsiveness Check
// ============================================================================

test('Landing Page is Mobile Responsive', async ({ page }) => {
  // Set viewport to iPhone size (375x667)
  await page.setViewportSize({ width: 375, height: 667 });
  console.log('✓ Viewport set to mobile size: 375x667');
  
  // Navigate to landing page
  await page.goto(URLS.landingPage, { waitUntil: 'networkidle', timeout: 30000 });
  await dismissCookieBanner(page);
  
  // Verify page title is not empty
  const title = await page.title();
  expect(title).not.toBe('');
  console.log(`✓ Page title: "${title}"`);
  
  // Verify main heading is visible on mobile
  const heading = page.locator('h1').first();
  await expect(heading).toBeVisible({ timeout: 5000 });
  const headingText = await heading.textContent();
  console.log(`✓ Main heading visible on mobile: "${headingText}"`);
  
  // Check if heading is readable (not cut off)
  const headingBox = await heading.boundingBox();
  if (headingBox) {
    expect(headingBox.width).toBeLessThanOrEqual(375);
    console.log('✓ Heading fits within mobile viewport');
  }
  
  // Verify navigation menu exists (could be hamburger menu)
  const navMenu = page.locator('nav, [role="navigation"], .menu, .navbar').first();
  await expect(navMenu).toBeVisible({ timeout: 5000 });
  console.log('✓ Navigation menu found on mobile');
  
  // Take mobile screenshot
  await page.screenshot({ 
    path: 'playwright-report/screenshots/landing-page-mobile.png',
    fullPage: true 
  });
  console.log('✓ Mobile screenshot saved: landing-page-mobile.png');
});

// ============================================================================
// HELPER FUNCTIONS (if needed for complex interactions)
// ============================================================================

/**
 * Helper function to wait for any of multiple elements
 */
async function waitForAnyElement(page: Page, selectors: string[], timeout = 5000): Promise<string> {
  const promises = selectors.map(selector => 
    page.locator(selector).first().waitFor({ state: 'visible', timeout })
      .then(() => selector)
      .catch(() => null)
  );
  
  const result = await Promise.race(promises);
  if (!result) {
    throw new Error(`None of the elements found: ${selectors.join(', ')}`);
  }
  return result;
}

/**
 * Helper function to safely click with retry logic
 */
async function safeClick(page: Page, selector: string, retries = 3): Promise<void> {
  for (let i = 0; i < retries; i++) {
    try {
      await page.locator(selector).first().click({ timeout: 5000 });
      return;
    } catch (error) {
      if (i === retries - 1) throw error;
      await page.waitForTimeout(1000);
    }
  }
}
