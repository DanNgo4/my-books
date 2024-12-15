import { dynamicOptions, inject } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";

import selectize from "selectize";

@dynamicOptions
@inject(Element, HttpClient)
export class AuSelectCustomAttribute {
  constructor(element, http) {
    this.element = element;
    this.http = http;

    // initialises the selected value to an empty object
    this.selected = {};
  }

  attached() {
    // initialises the jQuery plugin once the view has been attached to the DOM
    if (this.url) {
      this.initialiseRemoteSelectize();
    } else {
      this.initialiseClientSelectize();
    }
  }

  initialiseClientSelectize() {
    this.selectizeElement = $(this.element).selectize()[0];
  }

  initialiseRemoteSelectize() {
    // creates the selectize control, taking the configuration from dynamic properties
    this.selectizeElement = $(this.element).selectize({
      valueField: this.valueField,

      labelField: this.labelField,

      searchField: this.searchField,

      // preloads the data from the backend API (this could also be an option)
      preload: true,  

      options: [],

      // implements the load method, delegating the remote call to the Aurelia HttpClient
      load: (query, callback) => {  
        this.http
          .fetch(this.url)
          .then(response => response.json())
          .then(data => {
            callback(data);
          })
          .catch(error => {
            callback();
          });
      }
    })[0];

    // delegates the selectize-control change events to the original select statement
    this.selectizeElement.selectize.on('change', () => {
      let notice = new Event('change', { bubbles: true });
      $(this.element)[0].dispatchEvent(notice);
    });
  }

  unbind() {
    // cleans up the selectize element when the component is unbound
    this.selectizeElement.selectize.destroy();
  }
}
