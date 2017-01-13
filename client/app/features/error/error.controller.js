
export default class errorController {
  static get UID(){
    return "errorController";
  }

  goToDashboard(){
    this.$state.go('main.dashboard')
  }


  constructor($stateParams, ErrorService, $state) {
    "ngInject";
    this.code = $stateParams.code;
    this.$state = $state;
    this.error = ErrorService[this.code] || ErrorService.DEFAULT;
  }
}
