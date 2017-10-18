export default class userSelectItemController {
  static get UID(){
    return "userSelectItemController";

  }

  toogle() {
    this.user.$selected = !!!this.user.$selected;
  }

  constructor($scope, $q, Snack, DialogService, $stateParams, BroadcastEvents, $rootScope, LabelService, Spinner, $timeout, contextual, DeliveryZoneService) {
    "ngInject";
    this.$q =$q;
    this.$scope =$scope;
    this.Snack = Snack;
    this.Spinner = Spinner;
    this.DialogService = DialogService;
    this.LabelService = LabelService;
    this.contextual = contextual;
    this.DeliveryZoneService = DeliveryZoneService;
    this.$timeout = $timeout;
    this.newModifiers = [];
  }
}
