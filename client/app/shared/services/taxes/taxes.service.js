'use strict';

export default class TaxesService {

  static get UID(){
    return "TaxesService";
  }

  getTaxGroups(forceRefresh = false){
    var venueId = this.StateService.venue.id;
    console.log("TaxesService - Fetching taxe groups")
    return this.$q((resolve,reject)=>{
      if (!forceRefresh && this.taxGroups){
        console.log("TaxesService - Skip fetching tax groups")
        return resolve(this.taxGroups);
      }
      Preoday.TaxGroup.getByVenueId(venueId)
        .then((taxGroups)=>{
          this.taxGroups = taxGroups;
          console.log("TaxesService - resolve fetching tax groups")
          resolve(taxGroups);
        }, (err)=>{
          console.error("Error fetching taxGroups : ", err)
          reject();
      }).catch((err)=>{
        console.error("Error fetching taxGroups : ", err)
        reject();
      })
    })

  }

  getTaxRates(forceRefresh = false){
    var venueId = this.StateService.venue.id;
    console.log("TaxesService - Fetching taxes")
    return this.$q((resolve,reject)=>{
      if (!forceRefresh && this.taxRates){
        console.log("TaxesService - Skip fetching tax rates")
        return resolve(this.taxRates);
      }
      Preoday.TaxRate.getByVenueId(venueId)
        .then((taxGroups)=>{
          this.taxGroups = taxGroups;
          console.log("TaxesService - resolve fetching tax rates")
          resolve(taxGroups);
        }, (err)=>{
          console.error("Error fetching taxRates : ", err)
          reject();
      }).catch((err)=>{
        console.error("Error fetching taxRates : ", err)
        reject();
      })
    })

  }

  constructor($q, StateService) {
    "ngInject";
    this.$q = $q;
    this.StateService = StateService;
    this.taxGroups = false
    this.taxRates = false
  }
}
