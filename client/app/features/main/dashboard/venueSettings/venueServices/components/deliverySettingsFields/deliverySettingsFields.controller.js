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

  debounce(func, wait, immediate) {
    console.log("debouncing");
    return () => {
      var context = this, args = arguments;
      var later = function() {
        context.debounceTimeout = null;
        console.log("in later", immediate)
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !context.debounceTimeout;
      clearTimeout(context.debounceTimeout);
      context.debounceTimeout = setTimeout(later, wait);
      console.log("if call now", callNow);
      if (callNow) func.apply(context, args);
    };
  };

  doUpdate() {
    var promises = [];
    this.setDefaultLeadTime();
    promises.push(this.venue.settings.update())
    promises.push(this.saveFee())
    this.$q.all(promises).then((results)=>{
      angular.extend(this.venue.settings,results[0]);
      this.deliveryFee = results[1];
      this.isSaving = false;
      this.isError = false;
      console.log("saved all promises");
    },()=>{
      this.isSaving = false;
      this.isError = true;
      console.log("error saving all promises");
    }).catch((err)=>{
      console.error(err);
      console.log("exception saving all promises");
      this.isSaving = false;
      this.isError = true;
    })
  }

  saveFee () {

    if (!this.deliveryFee.amount) {
      this.deliveryFee.amount = 0;
    }

    if (this.deliveryFee.id) {
      return this.deliveryFee.update();
    }

    return Preoday.Fee.create(this.deliveryFee);
  }

  getEmptyDeliveryFee () {

    return new Preoday.Fee({
      type: Preoday.constants.FeeType.FIXED,
      venueId: this.venue.id,
      name: 'Delivery',
      orderType: Preoday.constants.OrderType.DELIVERY,
      endDate: null
    });
  }

  processFees (fees) {

    let deliveryFees = fees.filter((fee) => {

      return fee.orderType === Preoday.constants.OrderType.DELIVERY;
    });

    if (deliveryFees.length) {
      this.deliveryFee = deliveryFees[0];
    } else {
      this.deliveryFee = this.getEmptyDeliveryFee();
    }

    this.Spinner.hide("venue-details");
  }

  init () {

    this.venue.getFees()
      .then((fees) => {

        this.processFees(fees);
      }, () => {

        this.Snack.showError(this.LabelService.SNACK_ERROR_FETCHING_FEES)
        this.Spinner.hide("venue-details");
      });
  }

  setDefaultLeadTime() {
    if (this.venue.settings) {
      if (!this.venue.settings.leadTime) {
        this.venue.settings.leadTime = 0;
      }
      if (!this.venue.settings.deliveryLeadTime) {
        this.venue.settings.deliveryLeadTime = 0;
      }
    }
  }

  constructor($scope, $q, Snack, LabelService, Spinner) {
    "ngInject";

    this.$scope = $scope;
    this.$q = $q;
    this.Snack = Snack;
    this.LabelService = LabelService;
    this.Spinner = Spinner;

    this.isSaving = false;
    this.isError = false;
    this.debounceTimeout = null;

    this.init();
  }
}
