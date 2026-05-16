const { test, expect } = require("@playwright/test");

test.describe("Safora Contact Us Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact.html");
    await expect(page).toHaveTitle(/Safora|Contact/i);
    await scrollToGetInTouch(page);
  });

  test("should show validation errors when required fields are empty", async ({ page }) => {
    const nameField = page.getByRole("textbox", { name: /your name/i });
    const emailField = page.getByRole("textbox", { name: /email address/i });
    const messageField = page.getByRole("textbox", { name: /your message/i });
    const sendButton = page.getByRole("button", { name: /send message|submit|send/i });

    await expect(sendButton).toBeVisible();
    await sendButton.click();

    await expectFieldToBeInvalid(nameField);
    await expectFieldToBeInvalid(emailField);
    await expectFieldToBeInvalid(messageField);
  });

  test("should validate invalid email address", async ({ page }) => {
    const nameField = page.getByRole("textbox", { name: /your name/i });
    const emailField = page.getByRole("textbox", { name: /email address/i });
    const messageField = page.getByRole("textbox", { name: /your message/i });

    await nameField.fill("QA Tester");
    await emailField.fill("invalid-email");
    await messageField.fill("This is a QA automation test message.");

    await page.getByRole("button", { name: /send message|submit|send/i }).click();

    await expectFieldToBeInvalid(emailField);
  });

  test("should accept valid contact details before captcha submission", async ({ page }) => {
    const nameField = page.getByRole("textbox", { name: /your name/i });
    const emailField = page.getByRole("textbox", { name: /email address/i });
    const phoneField = page.getByRole("textbox", { name: /phone number/i });
    const messageField = page.getByRole("textbox", { name: /your message/i });

    await nameField.fill("QA Automation Tester");
    await emailField.fill("qa.automation@example.com");
    await phoneField.fill("+94771234567");
    await messageField.fill("This is a test message submitted as part of a QA internship assignment.");

    await expect(nameField).toHaveValue("QA Automation Tester");
    await expect(emailField).toHaveValue("qa.automation@example.com");
    await expect(phoneField).toHaveValue("+94771234567");
    await expect(messageField).toHaveValue(
      "This is a test message submitted as part of a QA internship assignment."
    );
    await expect(page.getByRole("button", { name: /send message|submit|send/i })).toBeVisible();
  });
});

async function scrollToGetInTouch(page) {
  const getInTouchHeading = page.getByRole("heading", { name: /get in touch/i });

  await expect(getInTouchHeading).toBeVisible();
  await getInTouchHeading.scrollIntoViewIfNeeded();
}

async function expectFieldToBeInvalid(locator) {
  await expect
    .poll(async () => locator.evaluate((element) => !element.checkValidity()))
    .toBe(true);
}
