import { StageComponent } from "aurelia-testing";
import { bootstrap } from "aurelia-bootstrapper";

import { TestHelper } from "./test-helper";

describe("Tooltip", () => {
  let component;

  beforeEach(() => {
    // stages the tooltip component, registering it with the ComponentTester
    component = StageComponent
      .withResources(
        "./resources/attributes/tooltip"
      )
      .inView(  // creates an inline view that uses the tooltip
        `<button id="el"
                 tooltip="
                   title.bind:'Remove book from list';
                   placement.bind:'top'
                 ">
         </button>`
      );
  });

  // helper function that uses jQuery to hover over the tooltip
  function hoverOverElement() {
    let button = document.querySelector("button");

    return TestHelper.fireJQueryEventAndWait("#el", "mouseenter");
  }

  it("tool tip is shown on hover", done => {
    component
      .create(bootstrap)  // Bootstraps a sandboxed Aurelia application
      .then(() => {
        // hovers over the inline view's button, and queries for an element with the .tooltip class
        hoverOverElement().then(_ => {
          let toolTip = document.querySelector(".tooltip");

          // checks that you have a tooltip when hovering over the button
          expect(toolTip).not.toBe(null);
          done();
        })
      })
      .catch(e => {
        console.log(e.toString());
      });
  });

  afterEach(() => {
    // disposes of the component after each test run
    component.dispose();
  })
});
