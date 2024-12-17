export class TestHelper {
  // simulates an HTTP fetch async call
  static mockResponseAsync(body) {
    return Promise.resolve({
      json: () => Promise.resolve(body)
    });
  }

  // gets the shadowRoot node for a given query selector
  static shadowRoot(querySelector) {
    return document.querySelector(querySelector).shadowRoot;
  }

  // clicks the elements and waits for the async bindings to complete
  static clickAndWait(element) {
    element.click();
    return new Promise(setTimeout);
  }

  // fires a jQuery event on the given selector and waits for the async bindings to complete
  static fireJQueryEventAndWait(selector, eventType) {
    $(selector)[eventType]();

    return new Promise(setTimeout);
  }
}
