# 🧪 Sitecore Website Testing Guide

Welcome! This guide will help you run automated tests on our Sitecore website to make sure everything is working correctly. Don't worry - it's really simple, and you don't need any technical knowledge.

---

## 📋 Table of Contents

1. [How to Run Tests](#how-to-run-tests)
2. [Understanding Test Results](#understanding-test-results)
3. [What Tests Check](#what-tests-check)
4. [Troubleshooting](#troubleshooting)
5. [Common Failures](#common-failures)

---

## 🚀 How to Run Tests

Follow these simple steps to test the website:

### Step 1: Go to GitHub
1. Open your web browser
2. Go to our GitHub repository: [YOUR_REPOSITORY_URL]
3. Make sure you're logged in to GitHub

### Step 2: Navigate to Actions
1. Click the **"Actions"** tab at the top of the page
   - It's located between "Pull requests" and "Projects"
2. You'll see a list of workflows on the left sidebar

### Step 3: Find the Test Workflow
1. Look for the workflow named **"Manual Test Execution - Sitecore Website"**
2. Click on it

### Step 4: Run the Tests
1. Click the **"Run workflow"** button (blue button on the right side)
2. A dropdown will appear
3. **Enter your email address** in the text field
   - Example: `yourname@company.com`
   - Make sure there are no typos!
4. Click the green **"Run workflow"** button

### Step 5: Wait for Results
- The tests will start running immediately
- You'll see a yellow dot 🟡 next to the workflow run (means "in progress")
- **Wait 2-3 minutes** for the email to arrive
- Check your inbox and spam folder

### 📸 Visual Guide
```
GitHub Home → Actions Tab → Manual Test Execution → Run Workflow → Enter Email → Run
```

---

## 📧 Understanding Test Results

You'll receive an email with the test results. Here's what everything means:

### ✅ PASSED Status
**What it means:** All tests passed! The website is working correctly.

**What you see:**
- Green checkmark ✅ in the subject line
- Email subject: `[TEST RESULTS] Sitecore Landing Page - PASSED`
- Summary showing all tests passed
- No action needed!

**Example:**
```
Status: PASSED
Total Tests: 5
✅ Passed: 5
❌ Failed: 0
```

### 🚨 FAILED Status
**What it means:** Something is broken on the website and needs attention.

**What you see:**
- Red alert icon 🚨 in the subject line
- Email subject: `[TEST RESULTS] Sitecore Landing Page - FAILED`
- Summary showing which tests failed
- Details about what went wrong

**What to do:**
1. Read the "Failure Details" section in the email
2. Click the "View Full Report on GitHub" button
3. Share the link with your technical team
4. Include the test name that failed (e.g., "Sign Up Form Submission Works")

**Example:**
```
Status: FAILED
Total Tests: 5
✅ Passed: 3
❌ Failed: 2

Failure Details:
❌ Sign Up Form Submission Works
   Error: Timeout waiting for success message
```

### 📊 Reading the Summary

Every email includes a summary section:

| Field | What It Means |
|-------|---------------|
| **Total Tests** | How many tests ran |
| **✅ Passed** | Tests that succeeded |
| **❌ Failed** | Tests that broke |
| **⏰ Execution Time** | When the tests ran |
| **🌐 Browser Tested** | Which browsers were tested (Chrome, Firefox, Safari) |

---

## 🔍 What Tests Check

Our automated tests verify that critical parts of the website work correctly:

### Test 1: Landing Page Loads Successfully
**What it checks:**
- The landing page opens without errors
- The main heading appears
- The page title is set correctly

**In simple terms:** Makes sure the page actually loads when someone visits it.

**Why it matters:** If this fails, visitors can't see the page at all.

---

### Test 2: Sign Up Form Submission Works
**What it checks:**
- The "Sign Up" button can be clicked
- The email field accepts text
- The submit button works
- A success message appears after submission

**In simple terms:** Makes sure people can sign up for newsletters or create accounts.

**Why it matters:** If this fails, we lose potential customers and subscribers.

---

### Test 3: Add to Cart Functionality Works
**What it checks:**
- The "Add to Cart" button can be clicked
- The cart updates with the new item
- The cart count badge increases

**In simple terms:** Makes sure customers can add products to their shopping cart.

**Why it matters:** If this fails, customers can't buy anything (major problem!).

---

### Test 4: Checkout Page Loads with Order Summary
**What it checks:**
- Customer can navigate to checkout
- Order summary appears
- Payment information section is visible

**In simple terms:** Makes sure the checkout process starts correctly.

**Why it matters:** If this fails, customers can't complete their purchase.

---

### Test 5: Landing Page is Mobile Responsive
**What it checks:**
- The landing page looks good on mobile phones
- Text is readable on small screens
- Navigation menu works on mobile

**In simple terms:** Makes sure the website works on phones, not just computers.

**Why it matters:** Most visitors use mobile devices. If this fails, we lose mobile customers.

---

## 🛠️ Troubleshooting

### Problem: I didn't receive an email

**Possible reasons:**
1. **Email in spam folder** → Check your spam/junk folder
2. **Typo in email address** → Run the test again with the correct email
3. **Test still running** → Wait up to 5 minutes (GitHub might be slow)
4. **Gmail credentials expired** → Contact your IT team

**How to check if test ran:**
1. Go to the Actions tab in GitHub
2. Look for your workflow run (shows your username)
3. Check if it shows a green checkmark ✅ or red X ❌

---

### Problem: Test failed but I don't know why

**What to do:**
1. Click the "View Full Report on GitHub" link in the email
2. Look for screenshots in the report
3. Share the GitHub link with your technical team
4. Copy the "Failure Details" section and send it to IT

**Example message to IT:**
```
Hi team,

The automated test failed. Here's what I found:

Failed Test: Sign Up Form Submission Works
Error: Timeout waiting for success message

GitHub Report: [paste the link from email]

Can you investigate?

Thanks!
```

---

### Problem: All tests suddenly started failing

**Possible reasons:**
1. **Website is down** → Check if the website loads in your browser
2. **Sitecore maintenance** → Check with IT if maintenance is scheduled
3. **Major website update** → Recent changes might need test updates

**What to do:**
1. Check if the website is accessible: [YOUR_WEBSITE_URL]
2. If website works fine, contact IT with the test report
3. If website is down, wait until it's back online and run tests again

---

## ⚠️ Common Failures

Here are the most common test failures and what they mean:

### "Timeout" Error
**What it says:**
```
Error: Timeout 30000ms exceeded waiting for element
```

**What it means:** The page took too long to load, or a button/form didn't appear.

**Common causes:**
- Website is running slowly
- Website is down
- Element was removed or renamed in Sitecore

**What to do:** Check if the website loads normally in your browser. If yes, contact IT.

---

### "Element not found" Error
**What it says:**
```
Error: Element not found: button[name="Sign Up"]
```

**What it means:** A button, link, or form field that the test expects is missing.

**Common causes:**
- Button text changed (e.g., "Sign Up" → "Subscribe")
- Button was moved to a different page
- Button was removed completely

**What to do:** Check the page and see if the button exists. If it was renamed or moved, let IT know so they can update the test.

---

### "Success message not appearing" Error
**What it says:**
```
Error: Success message not displayed after form submission
```

**What it means:** The form submitted, but no confirmation appeared.

**Common causes:**
- Success message was changed or removed
- Form validation is preventing submission
- Backend server issue

**What to do:** Try submitting the form manually in your browser. If it works, contact IT with screenshots.

---

### "Network error" or "Connection refused"
**What it says:**
```
Error: net::ERR_CONNECTION_REFUSED
```

**What it means:** The website is completely down or unreachable.

**Common causes:**
- Scheduled maintenance
- Server outage
- DNS issues

**What to do:** Try accessing the website. If it's down, contact IT immediately.

---

## 📞 Getting Help

If you're stuck or confused:

1. **Check this guide first** - Most questions are answered here
2. **Contact IT/Technical Team** - Share the email report link
3. **Don't worry!** - These tests are here to catch problems, not to stress you out

---

## 💡 Tips for Success

✅ **DO:**
- Run tests after making major changes to landing pages
- Run tests weekly to catch problems early
- Keep the email report for your records
- Share failures with IT immediately

❌ **DON'T:**
- Panic if a test fails - it's just letting you know something needs fixing
- Delete test reports - they help IT diagnose issues
- Ignore failed tests - they indicate real problems
- Run tests while Sitecore maintenance is happening

---

## 🎯 Quick Reference Card

**To run tests:**
1. GitHub → Actions → Manual Test Execution
2. Run Workflow → Enter email → Run
3. Wait 2-3 minutes for email

**If test passes:**
- ✅ Everything is working!
- No action needed

**If test fails:**
1. Read failure details in email
2. Click "View Full Report" link
3. Contact IT with the link
4. Include test name + error message

---

## 📅 Recommended Testing Schedule

- **After launching new landing pages** → Run tests immediately
- **After updating existing pages** → Run tests before and after
- **Weekly** → Run tests every Monday morning
- **Before big campaigns** → Run tests the day before launch

---

**Questions?** Contact your IT team or the person who set up this testing system.

**Last Updated:** December 2025
