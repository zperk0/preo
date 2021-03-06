'use strict';

export default class VoucherService {

  static get UID(){
    return "VoucherService";
  }

  getAssignCodeTypes() {
    var venueId = this.StateService.venue.id;

    console.log("VoucherService - Fetching external voucher code types");
    return this.$q((resolve,reject)=>{
      Preoday.Voucher.getAssignCodeTypes(venueId)
        .then((assignCodeTypes)=>{
          this.assignCodeTypes = assignCodeTypes;
          console.log("VoucherService - resolve fetching external voucher code types");
          resolve(assignCodeTypes);
        }, (err)=>{
          console.error("Error fetching external voucher code types: ", err);
          reject();
      }).catch((err)=>{
        console.error("Error fetching external voucher code types: ", err);
        reject();
      });
    });
  }

  constructor($q, StateService) {
    "ngInject";

    this.$q = $q;
    this.StateService = StateService;
  }
}
