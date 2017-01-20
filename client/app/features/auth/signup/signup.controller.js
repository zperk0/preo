
export default class signupController {
  static get UID(){
    return "signupController";
  }

  constructor($state) {
    "ngInject";
    this.$state = $state;

    this.user = {

    };
  }
}