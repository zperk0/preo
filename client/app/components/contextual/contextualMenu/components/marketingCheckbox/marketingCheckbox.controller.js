
export default class marketingCheckboxController {
  static get UID() {
    return 'marketingCheckboxController'
  }

  constructor() {
    'ngInject';
    this.$value = this.isEnabled() ? 1 : 0;
  }

  onToggleOpts() {
    this.ngModel.optinLoyalty = this.$value;
    this.ngModel.optinOffers = this.$value;
    this.ngModel.optinOther = this.$value;
  }

  isEnabled() {
    return angular.isObject(this.ngModel)
      && this.ngModel.optinLoyalty
      && this.ngModel.optinOffers
      && this.ngModel.optinOther;
  }
}
