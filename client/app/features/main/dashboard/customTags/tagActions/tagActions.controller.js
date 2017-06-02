export default class tagActionsController {
  static get UID(){
    return "tagActionsController"
  }

  /* @ngInject */
  constructor(Spinner, tagActions, tagGroups) {
    'ngInject';

    Spinner.hide('fetch-tags');
    this.tagActions = tagActions;
    this.tagGroups = tagGroups;
  }
}
