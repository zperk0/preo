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
        // this.dashboardDeferred.resolve();
        // this.dashboardDeferred = null;
      }, () => {
        this.resetData();
        // this.dashboardDeferred.reject();
        // this.dashboardDeferred = null;
      });

    return this.dashboardDeferred.promise;
  }

  processDashboard() {

    const {
      channels,
      venues,
      entityId,
      isChannel,
      dashboardDeferred,
    } = this;

    console.log('StateService [processDashboard] - entityId: ', entityId);

    if (entityId) {
      if (isChannel) {
        this.selectChannel(entityId)
          .then(dashboardDeferred.resolve, dashboardDeferred.reject);
      } else {
        this.selectVenue(entityId)
          .then(dashboardDeferred.resolve, dashboardDeferred.reject);
      }
    } else {
      if (channels.length) {
        isChannel
        ? this.selectChannel(channels[0].id)
        : this.navigateToChannel(channels[0].id);

        dashboardDeferred.resolve();
      } else if (venues.length) {
        const venueId = venues[0].id;
        isChannel
          ? this.navigateToVenue(venueId)
          : this.selectVenue(venueId)
                .then(dashboardDeferred.resolve, dashboardDeferred.reject);
      } else {

        console.warn('StateService [processDashboard] - there is no channel and venue set');
        this.logout();
      }
    }
  }

  selectChannel(channelId) {

    const {
      channels,
      UtilsService,
      entityId,
      $q,
    } = this;

    if (channelId > 0) {
      const selected = channels.filter((c) => {
        return +c.id === +channelId;
      });

      this.channel = selected.length ? selected[0] : null;
    } else {
      this.channel = channels[0];
    }

    const deferred = $q.defer();

    function done() {
      UtilsService.updateLocale();

      if (+this.channel.id !== +entityId) {
        this.navigateToChannel(this.channel.id);
      }
      deferred.resolve();
    }

    function _loadPermissions() {
      this.loadPermissions()
        .then(done.bind(this), done.bind(this));
    }

    if (!this.channel) {
      Preoday.Channel.findById(channelId)
        .then((channel) => {
          this.channel = channel;
          _loadPermissions.call(this);
        }, () => {

          if (channels.length) {
            this.navigateToChannel(channels[0].id)
          } else {
            this.logout();
          }
        });
    } else {
      _loadPermissions.call(this);
    }

    return deferred.promise;
  }

  logout() {
    this.UserService.signout();
  }

  goToNotFound() {
    const {
      entityId
    } = this;
    $state.go('main.notFound', {
      entityId: entityId
    });
  }

  selectVenue(venueId) {

    const {
      venues,
      VenueService,
      UtilsService,
      BroadcastEvents,
      isChannel,
      entityId,
      $rootScope,
      $q
    } = this;

    const deferred = $q.defer();

    function done () {

      if (isChannel || this.venue.id !== entityId) {
        this.navigateToVenue(this.venue.id);
      }

      deferred.resolve();
    }

    // const selected = venues.filter((v) => {
    //   return +v.id === +venueId;
    // });

    // this.venue = selected.length ? selected[0] : venues[0];

    VenueService.fetchById(venueId)
      .then((venue) => {

        this.venue = venue;
        this.venue.setAsCurrent();
        $rootScope.$broadcast(BroadcastEvents._ON_FETCH_VENUES);
        UtilsService.updateLocale();
        this.fetchPermissionsAndAccount()
          .then(done.bind(this), done.bind(this));
      }, (err) => {

        // UtilsService.updateLocale();
        // TODO: WHAT SHOULD WE DO HERE?
        console.warn('StateService [selectVenue] fetchById error', err);
        this.logout();
        deferred.reject();
      });

    return deferred.promise;
  }

  fetchPermissionsAndAccount() {

    const {
      PermissionService,
      isChannel,
      venue,
      channel,
      $q
    } = this;

    const deferred = $q.defer();

    this.loadPermissions()
      .then(() => {

        if (isChannel) {
          deferred.reject();
        } else {
          if (venue.accountId && PermissionService.hasPermission(PermissionService.Permissions.ACCOUNT_READ)) {
            Preoday.Account.get(venue.accountId)
              .then((account) => {
                this.account = account;
                deferred.resolve();
              }, deferred.resolve);
          } else {
            deferred.reject();
          }
        }
      }, deferred.reject);

    return deferred.promise;
  }

  navigateToChannel(channelId, shouldReload) {

    console.log('StateService [navigateToChannel] - ', channelId, shouldReload);

    const {
      isChannel,
      UtilsService,
      $state,
    } = this;

    if (!isChannel) {
      window.location.href = UtilsService.getHost() + '/channel/#/' + channelId + '/main/dashboard';
    } else {
      $state.go('main.dashboard', {
        entityId: channelId
      }, {
        reload: shouldReload || false
      });
    }
  }

  navigateToVenue(venueId, shouldReload) {

    const {
      isChannel,
      UtilsService,
      $state,
    } = this;

    if (isChannel) {
      window.location.href = UtilsService.getHost() + '/#/' + venueId + '/main/dashboard';
    } else {
      $state.go('main.dashboard', {
        entityId: venueId
      }, {
        reload: shouldReload || false
      });
    }
  }

  getEntityName() {

    const {
      isChannel,
      channel,
      venue
    } = this;

    if (isChannel) {
      return channel.name;
    }

    return venue.name;
  }

  dispatchLoadedEvent() {

    this.$rootScope.$broadcast(this.BroadcastEvents.ON_STATE_LOADED);
  }

  loadPermissions(expand) {

    const {
      PermissionService,
      channel,
      venue
    } = this;

    if (channel) {
      // load permissions by channel
      return PermissionService.loadPermissions(channel, expand);
    } else if (venue) {
      return PermissionService.loadPermissions(venue, expand);
    } else {
      console.warn('StateService [loadPermissions] - there is no channel and venue set');
    }
  }

  fetchVenues(expand, permissions) {
    const {
      channel,
      venue,
      isChannel,
      $q,
      VenueService,
    } = this;

    if (!isChannel) {
      return $q.when({
        venues: [venue]
      });
    }

    return VenueService.fetchVenuesByChannel(channel, expand, permissions);
  }

  updateVenue() {

    return this.VenueService.updateVenue(this.venue);
  }

  resetData() {
    this.venues = [];
    this.channels = [];
  }

  isLoaded() {
    return this.hasDashboardLoaded;
  }

  constructor($q, $rootScope, $state, $stateParams, $timeout, PermissionService, BroadcastEvents, VenueService, UtilsService, StateConfig, UserService) {
    "ngInject";
    this.$q = $q;
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$state = $state;
    this.$timeout = $timeout;

    this.PermissionService = PermissionService;
    this.BroadcastEvents = BroadcastEvents;
    this.VenueService = VenueService;
    this.UtilsService = UtilsService;
    this.UserService = UserService;

    this.hasDashboardLoaded = false;
    this.dashboardDeferred = null;

    this.isChannel = StateConfig.isChannel;
  }
}
