export default class myTagsController {
  static get UID(){
    return "myTagsController"
  }

  /* @ngInject */
  constructor(tags) {
    'ngInject';

    this.customTags = tags;
  }
}
