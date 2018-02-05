'use strict';

export default class TaxesService {

  static get UID() {
    return 'TaxesService';
  }

  getTaxSettings(forceRefresh = false) {
    console.log('[TaxesService] resolve fetching tax settings');
    return this.$q((resolve, reject) => {
      if (!forceRefresh && angular.isObject(this.settings)) {
        return resolve(this.settings);
      }

      this.fetchSettings()
        .then(settings => {
          console.log('[TaxesService] resolve fetching tax settings');
          this.settings = settings;
          resolve(settings);
        }).catch(err => {
          console.log('[TaxesService] error fetching tax settings');
          reject(err);
        });
    });
  }

  getTaxGroups(forceRefresh = false) {
    console.log('[TaxesService] fetching tax groups');
    return this.$q((resolve, reject) => {
      if (!forceRefresh && angular.isArray(this.groups)) {
        return resolve(this.groups);
      }

      this.fetchGroups()
        .then(groups => {
          console.log('[TaxesService] resolve fetching tax groups');
          this.groups = groups;
          resolve(groups);
        }).catch(err => {
          console.log('[TaxesService] error fetching tax groups');
          reject(err);
        });
    });
  }

  getTaxRates(forceRefresh = false) {
    console.log('TaxesService - Fetching tax rates')
    return this.$q((resolve, reject) => {
      if (!forceRefresh && angular.isArray(this.rates)) {
        return resolve(this.rates);
      }

      this.fetchRates()
        .then(rates => {
          console.log('[TaxesService] resolve fetching tax rates');
          this.rates = rates;
          resolve(rates);
        }).catch(err => {
          console.log('[TaxesService] error fetching tax rates', err);
          reject(err);
        });
    });
  }

  fetchSettings() {
    const {StateService} = this;
    if (StateService.isChannel) {
      return StateService.channel.getTaxSettings();
    }
    return StateService.venue.getTaxSettings();
  }

  fetchGroups() {
    const {StateService} = this;
    if (StateService.isChannel) {
      return StateService.channel.getTaxGroups();
    }
    return StateService.venue.getTaxGroups();
  }

  fetchRates() {
    const {StateService} = this;
    if (StateService.isChannel) {
      return StateService.channel.getTaxRates();
    }
    return StateService.venue.getTaxRates();
  }

  constructor($q, StateService) {
    'ngInject';
    this.$q = $q;
    this.StateService = StateService;
    this.settings = null;
    this.groups = null;
    this.rates = null;
  }
}
