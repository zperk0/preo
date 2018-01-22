'use strict';

export default class TaxesService {

  static get UID() {
    return 'TaxesService';
  }

  getTaxGroups(forceRefresh = false) {
    console.log('[TaxesService] fetching tax groups');
    return this.$q((resolve, reject) => {
      if (!forceRefresh && angular.isObject(this.taxGroups)) {
        return resolve(this.taxGroups);
      }

      this.getTaxGroupsBy()
        .then(taxGroups => {
          console.log('[TaxesService] resolve fetching tax groups');
          this.taxGroups = taxGroups;
          resolve(taxGroups);
        }).catch(err => {
          console.log('[TaxesService] error fetching tax groups');
          reject(err);
        });
    });
  }

  getTaxRates(forceRefresh = false) {
    console.log('TaxesService - Fetching tax rates')
    return this.$q((resolve, reject) => {
      if (!forceRefresh && angular.isObject(this.taxRates)) {
        return resolve(this.taxRates);
      }

      this.getTaxRatesBy()
        .then(taxRates => {
          console.log('[TaxesService] resolve fetching tax rates');
          this.taxRates = taxRates;
          resolve(taxRates);
        }).catch(err => {
          console.log('[TaxesService] error fetching tax rates', err);
          reject(err);
        });
    });
  }

  getTaxGroupsBy() {
    const {StateService} = this;
    if (StateService.isChannel) {
      return Preoday.TaxGroup.getByChannelId(StateService.channel.id);
    }
    return Preoday.TaxGroup.getByVenueId(StateService.venue.id);
  }

  getTaxRatesBy() {
    const {StateService} = this;
    if (StateService.isChannel) {
      return Preoday.TaxRate.getByChannelId(StateService.channel.id);
    }
    return Preoday.TaxRate.getByVenueId(StateService.venue.id);
  }

  constructor($q, StateService) {
    'ngInject';
    this.$q = $q;
    this.StateService = StateService;
    this.taxGroups = false
    this.taxRates = false
  }
}
