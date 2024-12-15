export class TestHelper {
  // simulates an HTTP fetch async call
  static mockResponseAsync(body) {
    return Promise.resolve({
      json: () => Promise.resolve(body)
    });
  }
}
