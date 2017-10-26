export default class userSelectItemController {
  static get UID(){
    return "userSelectItemController";

  }

  constructor($scope, $q, $timeout) {
    "ngInject";
    this.$q =$q;
    this.$scope =$scope;
    this.$timeout = $timeout;
  }
}
