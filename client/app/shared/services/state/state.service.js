'use strict';

export default class StateService {

  static get UID(){
    return "StateService";
  }

  start() {

    if (this.dashboardDeferred) {
      return this.dashboardDeferred.promise;
    }

    if (this.hasDashboardLoaded) {
      return this.$q.resolve({
        venues: this.venues,
        channels: this.channels
      });
    }

    this.dashboardDeferred = this.$q.defer();

    Preoday.Dashboard.fetch()
      .then((data) => {

        this.venues = data.venues;
        this.channels = data.channels;

        console.info('StateService [start] - venues and channels: ', data);

        this.processDashboard();
        this.hasDashboardLoaded = true;
        this.dashboardDeferred.resolve();
        this.dashboardDeferred = null;
      }, () => {
        this.resetData();
        this.dashboardDeferred.reject();
        this.dashboardDeferred = null;
      });

    return this.dashboardDeferred.promise;
  }

  processDashboard() {

    const {
      channels,
      venues,
      entityId,
      isChannel,
    } = this;

    if (entityId) {
      if (isChannel) {
        if (channels.length) {
          this.selectChannel(entityId);
        } else {
          // this.redirectToVenu(this.entityId);
        }
      } else {
        this.selectVenue(entityId);
      }
    } else {
      if (channels.length) {
        this.selectChannel(channels[0].id);
      } else if (venues.length) {
        this.selectVenue(venues[0].id);
      } else {
        console.warn('StateService [processDashboard] - there is no channel and venue set');
      }
    }
  }

  selectChannel(channelId) {

    const {
      channels
    } = this;
    const selected = channels.filter((c) => {
      return +c.id === +channelId;
    });

    this.channel = selected.length ? selected[0] : channels[0];
  }

  selectVenue(venueId) {

    console.log('StateService [selectVenue] - venueid: ', venueId);
    const {
      venues
    } = this;

    const selected = venues.filter((v) => {
      return +v.id === +venueId;
    });

    this.venue = selected.length ? selected[0] : venues[0];
  }

  loadPermissions() {

    const {
      PermissionService,
      channel,
      venue
    } = this;

    if (channel) {
      // load permissions by channel
      return PermissionService.loadPermissions(channel);
    } else if (venue) {
      return PermissionService.loadPermissions(venue);
    } else {
      console.warn('StateService [loadPermissions] - there is no channel and venue set');
    }
  }

  resetData() {
    this.venues = [];
    this.channels = [];
  }

  isLoaded() {
    return this.hasDashboardLoaded;
  }

  constructor($q, $state, $stateParams, $timeout, PermissionService) {
    "ngInject";
    this.$q = $q;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$state = $state;
    this.$timeout = $timeout;

    this.PermissionService = PermissionService;

    this.hasDashboardLoaded = false;
    this.dashboardDeferred = null;

    this.isChannel = window._PREO_DATA._IS_CHANNEL || false;
    this.entityId = $stateParams.entityId;
  }
}
