import { PageObjectApp } from "./app.po.js";
import { PageObjectLogin } from "./login.po.js";

describe("my-books", function() {
  let poLogin;
  let poApp;

  beforeEach(() => {
    // initialises an instance of the page objects before each test run
    poApp = new PageObjectApp();
    poLogin = new PageObjectLogin();

    // loads the browser and waits for the Aurelia bootstrap process to complete
    browser.loadAndWaitForAureliaPage("http://localhost:8080");
  });

  it("should load the page and display the initial page title", () => {
    // verifies the initial page title is correct (you've loaded the app correctly)
    expect(poApp.getCurrentPageTitle()).toBe("login | My-Books");
  });

  it("should display a header", () => {
    // verifies the login page has the expected header
    expect(poLogin.getHeader()).toBe("my-books");
  });

  it("it should fail to log in with invalid password", () => {
    // enters invalid login credentials into the login form
    poLogin.setUsername("Bilbo");
    poLogin.setPassword("password3");

    // submits the login form
    poLogin.pressSubmitButton();

    expect(poLogin.getLoginError()).toBe(
      // ensures the invalid login message is displayed
      "Authentication failed. Invalid user name or password."
    );
  });

  it("it should login with valid username and password", () => {
    // enters valid login credentials into the login form
    poLogin.setUsername("Bilbo");
    poLogin.setPassword("password1");

    // submits the login form
    poLogin.pressSubmitButton();

    // 200ms sleep to allow page transition to complete
    browser.sleep(200);

    // verifies a successful transition to the homepage on a valid login
    expect(poApp.getCurrentPageTitle()).toBe("home | My-Books");
  })
})
