export class PageObjectLogin {
  constructor() {}

  getHeader() {
    // gets the login-page-heading text
    return element(by.tagName("h1.brand-heading")).getText();
  }

  setUsername(value) {
    // gets the username element, clears the current text, and sets it to the provided value
    return element(by.valueBind("userName"))
      .clear()
      .sendKeys(value);
  }

  setPassword(value) {
    // gets the password element, clears the current text, and sets it to the provided value
    return element(by.valueBind("password"))
      .clear()
      .sendKeys(value);
  }

  pressSubmitButton() {
    // clicks the login Submit button to submit the form
    return element(by.css('button[type="submit"]')).click();
  }

  getLoginError() {
    // gets the login error text for invalid login credentials
    return element(by.css(".card-body.login-error")).getText();
  }
}
