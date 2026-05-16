# Safora Contact Form Automation

Playwright test automation for the Safora `Contact Us` page.

## Files

- Main test: `tests/contact-us.spec.js`
- Playwright config: `playwright.config.js`

## Prerequisites

- Node.js 18+
- npm

## Install

```bash
npm install
```

## Run

Run all tests:

```bash
npm test
```

Run only the contact form test:

```bash
npx playwright test tests/contact-us.spec.js --project=chromium
```

Run in headed mode:

```bash
npm run test:headed
```

## Notes

- The contact form includes reCAPTCHA, so the test focuses on field interaction and validation behavior rather than a guaranteed end-to-end successful submission.
- The test covers empty required fields, invalid email validation, and valid data entry.

## GitHub Submission

You can submit either:

- the raw code file: `tests/contact-us.spec.js`
- or a GitHub repository link containing this project and this README
