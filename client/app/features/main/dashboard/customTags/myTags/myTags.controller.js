export default class myTagsController {
  static get UID(){
    return "myTagsController"
  }

  /* @ngInject */
  constructor(Spinner, tags) {
    'ngInject';

    Spinner.hide('fetch-tags');
    this.customTags = tags;
  }
}
