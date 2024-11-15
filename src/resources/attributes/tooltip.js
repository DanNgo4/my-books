import { inject, bindable } from "aurelia-framework";

@inject(Element)  // injects element this attribute is attached to
export class TooltipCustomAttribute {
  @bindable title;
  @bindable placement;

  constructor(element) {
    this.element = element;
  }

  attached() {
    // wrap the element in a jQuery object
    // and initialises the Bootstrap jQuery tooltip plugin on the element
    $(this.element).tooltip({ 
      title: this.title,
      placement: this.placement 
    });
  }

  detached() {
    // wrap the element in a jQuery object
    // and disposes the tooltip reference when the view is detached from the DOM
    // to ensure that resources are not leaked by accidentally creating an ever-increasing number of these plugin (tooltip) references each time navigating between Aurelia views
    $(this.element).tooltip("dispose"); 
  }
}
