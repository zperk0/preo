export default class deliverySettingsFieldsController {

  static get UID() {
    return "deliverySettingsFieldsController"
  }

  debounceUpdate(which){
    if (this.deliveryForm.$valid){
      console.log("debouncing update", which);
      this.isSaving = true;
      this.debounce(this.doUpdate.bind(this), 1000)()
    }
  }

  constructor($scope) {
    "ngInject";

    this.$scope = $scope;
    this.isSaving = false;
    this.isError = false;

  }
}
