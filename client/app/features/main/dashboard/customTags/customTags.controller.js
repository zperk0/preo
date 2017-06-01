
export default class customTagsController {
  static get UID(){
    return "customTagsController";
  }

  constructor(Spinner) {
    "ngInject";

    Spinner.hide('fetch-tags');
  }
}
