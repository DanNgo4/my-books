export class PageObjectApp {
  constructor() {}

  getCurrentPageTitle() {
    // retrieves the current page title
    return browser.getTitle();
  }
}
