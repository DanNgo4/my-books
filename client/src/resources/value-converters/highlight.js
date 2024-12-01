export class HighlightValueConverter {
  // implements the toView method, passing in the text to convert
  toView(value) {
    if (value && value.indexOf("<b>" !== -1)) {
      return `
        <span style="
          background-color: #ECEEEF;
          padding: 10px;
        ">
          ${value}
        </span>
      `;
    }
  }
}
