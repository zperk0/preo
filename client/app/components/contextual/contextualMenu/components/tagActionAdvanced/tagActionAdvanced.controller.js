export default class tagActionAdvancedController {
  static get UID(){
    return "tagActionAdvancedController"
  }

  onActivateLinkChange() {
    if (this.tagAction.$activateLink) {
      this.tagAction.buttonLabel = this.prevButtonLabel;
      this.tagAction.externalUrl = this.prevExternalUrl;
    } else {
      this.prevButtonLabel = this.tagAction.buttonLabel;
      this.prevExternalUrl = this.tagAction.externalUrl;
      this.tagAction.buttonLabel = '';
      this.tagAction.externalUrl = '';
    }
  }

  /* @ngInject */
  constructor() {
    'ngInject';

    this.tagAction.$activateLink = !!this.tagAction.buttonLabel && !!this.tagAction.externalUrl;
    this.prevButtonLabel = this.tagAction.buttonLabel;
    this.prevExternalUrl = this.tagAction.externalUrl;
  }
}
