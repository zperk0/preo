export default class promotionsListController {
  static get UID(){
    return "promotionsListController"
  }

  /* @ngInject */
  constructor(StateService) {
    "ngInject";
    this.StateService = StateService
  }
}
