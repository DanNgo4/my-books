import { inject, bindable, DOM } from "aurelia-framework";

// injects a reference to the current Element
@inject(Element)
export class StarRating {
  @bindable rating;

  constructor(element) {
    this.element = element;

    // declares the star-rating default data
    this.stars = [
      { type: "-o", displayType: "-o", rated: false },
      { type: "-o", displayType: "-o", rated: false },
      { type: "-o", displayType: "-o", rated: false },
      { type: "-o", displayType: "-o", rated: false },
      { type: "-o", displayType: "-o", rated: false }
    ];

    // defaults the star hovered state to false
    this.hovered = false;
  }

  bind() {
    // applies the rating bound from the parent
    this.applyRating(this.rating);
  }

  // applies the rating on each of the stars
  applyRating(rating) {
    this.stars.forEach((star, index) => this.rateStar(star, rating, index));
  }

  // applies the rating for an individual star
  rateStar(star, rating, index) {
    (index < rating) ? this.toggleOn(star) : this.toggleOff(star);
  }

  // toggles a star to "rated"
  toggleOn(star) {
    star.type = "";
    star.displayType = "";
    star.rated = true;
  }

  // toggles a start to "unrated"
  toggleOff(star) {
    star.type = "-o";
    star.displayType = "-o";
    star.rated = false;
  }

  // calculates the star rating based on the stars index
  ratingFromIndex(index, star) {
    if (index === 0 && star.rated) return 0;

    return index + 1;
  }

  // rates a star with a given index
  rate(index) {
    let rating = this.ratingFromIndex(index, this.stars[0]);

    this.rating = rating;

    this.applyRating(rating);

    this.raiseChangedEvent();
  }

  // handles a mouse-out exit from a star
  mouseOut(hoverIndex) {
    if (!this.hovered) return;

    this.hovered = false;

    this.applyHoverState(hoverIndex);
  }

  // applies the hovered state to a star
  applyHoverState(hoverIndex) {
    this.stars.forEach((star, index) => {
      if (!this.shouldApplyHover(index, hoverIndex, star)) return;

      (this.hovered) ? this.toggleDisplayOn(star) : this.toggleDisplayOff(star);
    });
  }

  // handles the mouse-over event on a star
  mouseOver(hoverIndex) {
    if (this.hovered) return;

    this.hovered = true;

    this.applyHoverState(hoverIndex);
  }

  // toggles the star-displayed status to off
  toggleDisplayOff(star) {
    star.displayType = star.type;
  }

  // toggle the star-displayed status to on
  toggleDisplayOn(star) {
    star.displayType = "";
  }

  // calculates whether a hover state should be applied to a star
  shouldApplyHover(starIndex, hoverIndex, star) {
    return starIndex <= hoverIndex && !star.rated;
  }

  // raises a custom "change" event to be handled by the other components
  raiseChangedEvent() {
    // create a custom event, passing along the star rating
    let changeEvent = DOM.createCustomEvent("change", { detail: {rating: this.rating} });

    // dispatches the rating-changed custom event
    this.element.dispatchEvent(changeEvent);
  }
}
