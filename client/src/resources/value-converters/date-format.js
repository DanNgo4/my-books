import moment from "moment";

export class DateFormatValueConverter {
  // this is a toView value converter (from the view-model to the view)
  toView(value) {
    if (!value) return "";

    return moment(value).format("MM/DD/YYYY h:mm:ss a");
  }
}
