export default class tagActionBasicController {
  static get UID(){
    return "tagActionBasicController"
  }

  /* @ngInject */
  constructor($timeout) {
    'ngInject';

    this.tagGroups = [];

    $timeout(() => {
      this.tagGroups = this.contextualMenuCtrl.params.tagGroups;
    });
  }
}
