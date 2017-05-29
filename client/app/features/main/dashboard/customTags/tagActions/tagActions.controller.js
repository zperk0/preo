export default class tagActionsController {
  static get UID(){
    return "tagActionsController"
  }

  /* @ngInject */
  constructor(tagActions) {
    'ngInject';

    this.tagActions = tagActions;
  }
}
