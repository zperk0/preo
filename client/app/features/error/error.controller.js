
export default class errorController {
  static get UID(){
    return "errorController";
  }


  constructor($stateParams, ErrorService) {
    "ngInject";
    this.code = $stateParams.code;
    this.error = ErrorService[this.code] || ErrorService.DEFAULT;
  }
}
