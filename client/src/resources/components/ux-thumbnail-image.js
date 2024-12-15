import { bindable, useShadowDOM } from "aurelia-framework";

// encapsulates the component within a Shadow DOM node
@useShadowDOM()
export class UxThumbnailImage {
  // makes the image source, href and caption configurable
  @bindable imgSrc;
  @bindable imgHref;
  @bindable imgCap;

  // defaults the componennt to use relative positioning
  @bindable positionAbsolute = false;
}
