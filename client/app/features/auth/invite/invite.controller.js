
export default class inviteController {
  static get UID(){
    return "inviteController";
  }

  constructor($state, $stateParams) {
    "ngInject";
    this.$state = $state;

console.log('invite controller', $stateParams);
  }
}