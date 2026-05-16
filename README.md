Playwright test automation for the Safora `Contact Us` page.

## Files

- Main test: `tests/contact-us.spec.js`
- Playwright config: `playwright.config.js`


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
