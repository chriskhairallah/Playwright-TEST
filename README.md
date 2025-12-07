# Sitecore Playwright Testing - Setup Instructions

## 📁 Project Structure
```
Playwright/
├── .github/
│   └── workflows/
│       └── manual-test.yml          # GitHub Actions workflow
├── tests/
│   └── landing-page.spec.ts         # Test suite
├── playwright-report/                # Generated after test runs
├── playwright.config.ts              # Playwright configuration
├── package.json                      # Dependencies
├── TESTING.md                        # User guide for team
└── README.md                         # This file
```

---

## 🚀 Quick Start

### 1. Install Dependencies
```powershell
npm install
```

### 2. Install Playwright Browsers
```powershell
npx playwright install
```

### 3. Configure Your Website URL
Edit `playwright.config.ts` and update line 38:
```typescript
baseURL: 'https://YOUR-SITECORE-WEBSITE.com',
```

### 4. Update Test URLs
Edit `tests/landing-page.spec.ts` and update the URLS object (lines 16-21):
```typescript
const URLS = {
  landingPage: '/your-actual-landing-page',
  productPage: '/products/your-product',
  cart: '/cart',
  checkout: '/checkout',
};
```

### 5. Run Tests Locally (Optional)
```powershell
npm test
```

---

## 🔐 GitHub Setup

### Step 1: Create Gmail App Password

1. Go to your Gmail account
2. Enable 2-Step Verification (Security Settings)
3. Go to: https://myaccount.google.com/apppasswords
4. Generate a new App Password for "Mail"
5. Copy the 16-character password (save it somewhere safe)

### Step 2: Add GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add two secrets:

**Secret 1:**
- Name: `GMAIL_USERNAME`
- Value: `your-email@gmail.com`

**Secret 2:**
- Name: `GMAIL_PASSWORD`
- Value: [paste the 16-character app password]

### Step 3: Push Code to GitHub

```powershell
git add .
git commit -m "Add Playwright testing setup"
git push origin main
```

---

## ✅ Testing the Setup

### Test 1: Run Locally
```powershell
npm test
```
- Should execute all 5 tests
- Check `playwright-report/` folder for HTML report

### Test 2: Run on GitHub
1. Go to GitHub → Actions tab
2. Click "Manual Test Execution - Sitecore Website"
3. Click "Run workflow"
4. Enter your email
5. Click "Run workflow" button
6. Wait for email (2-3 minutes)

---

## 📋 Customization Guide

### Update Test Selectors
If buttons or forms on your website have different names:

1. Open `tests/landing-page.spec.ts`
2. Find the test that's failing
3. Update selectors to match your website:

**Example: Update Sign Up button**
```typescript
// Current (line 68)
const signUpButton = page.getByRole('button', { name: /sign up/i })

// Change to match your button text
const signUpButton = page.getByRole('button', { name: /subscribe/i })
```

### Add More Tests
Create additional test files in the `tests/` folder:
```typescript
// tests/checkout.spec.ts
import { test, expect } from '@playwright/test';

test('Complete checkout process', async ({ page }) => {
  // Your test code here
});
```

---

## 🛠️ Troubleshooting

### Problem: TypeScript Errors
**Solution:** Run `npm install` to install all dependencies including TypeScript types.

### Problem: Tests Fail Locally
**Solution:** 
1. Check if website URL is correct in `playwright.config.ts`
2. Check if website is accessible
3. Run with `--headed` flag to see browser: `npm run test:headed`

### Problem: GitHub Action Fails
**Solution:**
1. Check if GMAIL_USERNAME and GMAIL_PASSWORD secrets are set correctly
2. Verify Gmail app password is valid
3. Check workflow logs in GitHub Actions tab

### Problem: Email Not Received
**Solution:**
1. Check spam folder
2. Verify email address was typed correctly
3. Check if Gmail credentials are expired
4. Look at GitHub Actions logs for email sending errors

---

## 📊 Understanding Test Reports

### Local Reports
After running tests locally, view the HTML report:
```powershell
npx playwright show-report
```

### GitHub Reports
1. Go to Actions tab
2. Click on the workflow run
3. Scroll down to "Artifacts"
4. Download "playwright-report"
5. Extract and open `index.html`

---

## 🔄 Maintenance

### Update Playwright
```powershell
npm install @playwright/test@latest
npx playwright install
```

### Update Tests After Website Changes
When your Sitecore team updates the website:
1. Run tests locally to see what breaks
2. Update selectors in test files to match new elements
3. Commit and push changes

---

## 📚 Resources

- **Playwright Docs:** https://playwright.dev/docs/intro
- **Playwright Best Practices:** https://playwright.dev/docs/best-practices
- **Selector Guide:** https://playwright.dev/docs/selectors
- **GitHub Actions Docs:** https://docs.github.com/en/actions

---

## 💬 Support

For questions or issues:
1. Check `TESTING.md` for user-facing questions
2. Check Playwright documentation
3. Review GitHub Actions logs for technical issues

---

**Created:** December 2025  
**Version:** 1.0.0
