import { StageComponent } from "aurelia-testing";
import { bootstrap } from "aurelia-bootstrapper";

import TestData from "./test-data";
import { TestHelper } from "./test-helper";

describe("UxTextArea", () => {
  let component;
  let bookDescription = TestData.Books.Oliver.description;

  beforeEach(() => {
    // stages the ux-text-area component, registering it with the ComponentTester
    component = StageComponent
      .withResources(
        "./resources/components/ux-text-area"
      )
      .inView(  // Aurelia HTML view markup that uses the component
        `<ux-text-area text-content.bind="description"></ux-text-area>`
      )
      .boundTo({ description : bookDescription });  // binds a test view-model to the inline view
  });

  // helper function to get the text-area element
  function getTextAreaElement() {
    return TestHelper.shadowRoot("ux-text-area");
  }

  // helper function to get the text-block element
  function getTextBlockElement() {
    return TestHelper.shadowRoot("ux-text-area").querySelector(".text-block");
  }

  // helper function to click the text-area's OK button and flush any async bindings
  function clickOkButton() {
    let okButton = TestHelper.shadowRoot("ux-text-area").querySelector("button.ok");

    return TestHelper.clickAndWait(okButton);
  }

  // helper function to change the text value of the text-area
  function changeTextAreaValue() {
    let componentElement = getTextAreaElement();
    let textArea = componentElement.querySelector("textarea");
    textArea.value = value;
    let event = new Event("change");

    textArea.dispatchEvent(event);
  }

  // helper function to click the text-area, toggling it into edit mode
  function editText() {
    return TestHelper.clickAndWait(getTextBlockElement());
  }

  it("should initialise component with a text-box", done => {
    component
      .create(bootstrap)  // Bootstraps a sandboxed Aurelia application
      .then(() => {
        // gets the text-area content
        let actualDescription = getTextBlockElement().innerHTML;

        // verifies the text-area content is initally set to the bound value
        expect(bookDescription).toBe(actualDescription);
        done();
      })
      .catch(e => {
        console.log(e.toString());
      });
  });

  it("transition to a text-area once clicked", done => {
    component
      .create(bootstrap)  //  Bootstraps a sandboxed Aurealia application 
      .then(() => {
        // initialised edit mode on the text-area and waits for the async response
        editText().then(_ => {
          let actualDescription = getTextAreaElement().querySelector("textarea").value;

          // checks that the text-area field is shown once you're in edit mode
          expect(bookDescription).toBe(actualDescription);
          done();
        });
      })
      .catch(e => {
        // logs any exceptions fired wihtin test execution to the console
        console.log(e.toString());
      });
  });

  it("it saves changes when ok button is clicked", done => {
    component
      .create(bootstrap)
      .then(() => {
        const updatedValue = "Updated value";

        // initialises edit mode and waits for the promise to resolve
        editText().then(_ => {
          // changes the value of the text-area field
          changeTextAreaValue(updatedValue);

          // clicks the OK button and waits for the promise to resolve
          clickOkButton().then(_ => {
            let actualDescription = getTextBlockElement().innerHTML;

            // verifies that the text-area component's text is saved
            expect(actualDescription).toBe(updatedValue);
            done();
          });
        });
      })
      .catch(e => {
        console.log(e.toString());
      });
  });

  afterEach(() => {
    // disposes of the component to clean up after each test
    component.dispose();
  });
});
