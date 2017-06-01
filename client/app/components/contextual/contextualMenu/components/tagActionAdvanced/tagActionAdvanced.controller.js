export default class tagActionAdvancedController {
  static get UID(){
    return "tagActionAdvancedController"
  }

  /* @ngInject */
  constructor() {
    'ngInject';

    this.tagAction.$activateLink = this.tagAction.buttonLabel || this.tagAction.externalUrl;

  }
}
