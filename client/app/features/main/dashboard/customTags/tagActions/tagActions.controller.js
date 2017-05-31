export default class tagActionsController {
  static get UID(){
    return "tagActionsController"
  }

  /* @ngInject */
  constructor(tagActions, tagGroups) {
    'ngInject';

    this.tagActions = tagActions;
    this.tagGroups = tagGroups;
  }
}
