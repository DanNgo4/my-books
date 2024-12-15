import { Greeter } from "./greeter";

// describes this set of specs
describe("The Greeter", () => {
  // describes what you're verifying in this spec
  it("returns a greeting", function() {
    let greeter = new Gretter();

    // defines the message-value expectation
    expect(greeter.message).toBe("Hello brave world!");
  });
})
