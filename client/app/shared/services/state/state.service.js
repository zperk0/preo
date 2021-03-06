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

    Preoday.Dashboard.fetch('currency')
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
      UserService,
      entityId,
      $q,
      $state
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

      // check for `state` name to prevent the user from remaining on the sign in screen
      if (+this.channel.id !== +entityId || ($state.current.name && $state.current.name.indexOf('main') !== 0)) {
        this.navigateToChannel(this.channel.id);
      }
      deferred.resolve();
    }

    function _loadPermissions() {
      this.loadPermissions()
        .then(done.bind(this), done.bind(this));
    }

    if (!this.channel) {

      if (entityId && !UserService.isAdmin()) {
        UserService.signout();
        return $q.reject();
      }


      Preoday.Channel.findById(channelId, 'currency')
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
      UserService,
      UtilsService,
      BroadcastEvents,
      isChannel,
      entityId,
      $rootScope,
      $q,
      $state
    } = this;

    const deferred = $q.defer();

    function done () {

      // check for `state` name to prevent the user from remaining on the sign in screen
      if (isChannel || this.venue.id !== entityId || ($state.current.name && $state.current.name.indexOf('main') !== 0)) {
        this.navigateToVenue(this.venue.id);
      }
      deferred.resolve();
    }

    const selected = venues.filter((v) => {
      return +v.id === +venueId;
    });

    const venue = selected.length ? selected[0] : null;

    if (!venue && entityId && !UserService.isAdmin()) {
      UserService.signout();
      return $q.reject();
    }

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

    const {
      isChannel,
      UtilsService,
      $state,
      $timeout,
      $window,
    } = this;

    console.log('StateService [navigateToChannel] - ', channelId, shouldReload, isChannel);

    if (!isChannel) {
      const url = UtilsService.getHost() + '/channel/#/' + channelId + '/main/dashboard';
      $window.location.replace(url);
      $timeout(() => {
        // This is a hack because in some cases the url has not updated in the browser
        $window.location.replace(url);
      });
      console.log('StateService [navigateToChannel] - going to url - ', UtilsService.getHost() + '/channel/#/' + channelId + '/main/dashboard');
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
      $timeout,
      $window,
    } = this;

    if (isChannel) {
      const url = UtilsService.getHost() + '/#/' + venueId + '/main/dashboard';
      $window.location.replace(url);
      $timeout(() => {
        // This is a hack because in some cases the url has not updated in the browser
        $window.location.replace(url);
      });
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

  getUsers() {

    const {
      channel,
      venue
    } = this;

    if (channel) {
      return channel.getUsers('roles');
    } else if (venue) {
      return venue.getUsers();
    } else {
      console.warn('StateService [getUsers] - there is no channel and venue set');
    }
  }

  getInvites() {

    const {
      channel,
      venue
    } = this;

    if (channel) {
      return channel.getInvites();
    } else if (venue) {
      return venue.getInvites();
    } else {
      console.warn('StateService [getInvites] - there is no channel and venue set');
    }
  }

  getOffers() {
    const {
      channel,
      venue
    } = this;

    if (channel) {
      return channel.getOffers();
    } else if (venue) {
      return venue.getOffers();
    } else {
      console.warn('StateService [getOffers] - there is no channel and venue set');
    }
  }

  removeUser(user, userRole) {

    const {
      channel,
      venue
    } = this;

    if (channel) {
      const userToDelete = angular.copy(user);
      userToDelete.userRoles = angular.copy(userToDelete.userRoles);
      const userRoleToDelete = userToDelete.userRoles.filter((ur) => {
        return ur.role === userRole.role;
      });
      if (userRoleToDelete.length) {
        userToDelete.userRoles.splice(userRoleToDelete[0], 1);
      }
      return userToDelete.updateRoles(userToDelete.userRoles);
    } else if (venue) {
      return venue.removeUser(user);
    } else {
      console.warn('StateService [removeUser] - there is no channel and venue set');
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

  getPriceConfig () {

    const {
      channel,
      venue,
      venues,
      isChannel,
      VenueService,
    } = this;

    var config = {
      thousand: ',',
      decimal: '.',
      format: '%s%v',
      symbol: ''
    };

    function _buildConfig(entity) {
      var countryCode = entity.country || 'GB';
      config.symbol = entity.ccySymbol || entity.ccy || '';

      if (["FR", "DE", "NO", "SE"].indexOf(countryCode) >= 0) {
          config.thousand = " ";
          config.decimal = ",";
          config.format = "%v%s";
          if(countryCode == 'NO') {
            config.format = "%s %v";
          } else if(countryCode == 'SE') {
            config.format = "%v %s";
          }
      }
    }

    if (venue) {
      _buildConfig(venue);
    } else if (channel) {
      _buildConfig(channel);
    } else {
      console.warn("StateService [getPriceConfig] - why we don't have a venue or channel set?");
    }

    return config;
  }

  updateVenue() {

    return this.VenueService.updateVenue(this.venue);
  }

  searchUser(value) {
    const obj = {
      search: value,
      limit: 30,
      orderBy: 'firstName'
    };

    const {
      channel,
      venue
    } = this;

    if (channel) {
      return channel.searchCustomers(obj, this.domainId);
    } else if (venue) {
      return venue.searchCustomers(obj, this.domainId);
    } else {
      console.warn('StateService [searchUser] - there is no channel and venue set');
    }

  }

  searchCustomers(value) {

    this.isSearchingCustomers = true;
    return this.channel.searchCustomers(value)
                .finally(() => {
                  this.isSearchingCustomers = false;
                });
  }

  resetData() {
    this.entityId = undefined;
    this.isChannel = false;
    this.venues = [];
    this.channels = [];
  }

  isLoaded() {
    return this.hasDashboardLoaded;
  }

  isOperator() {
    return this.channel && this.channel.callCenter && +this.channel.callCenter.operatorFlag === 1;
  }

  getOperateUrl() {
    console.log('dexa bri -->>', this.channel && this.channel.callCenter && this.channel.callCenter.operateUrl);
    return this.channel && this.channel.callCenter && this.channel.callCenter.operateUrl;
  }

  getDomain() {
    const {
      venue,
      channel,
    } = this;

    if (channel) {
      return channel.domain;
    }

    return venue && venue.domainId;
  }

  constructor($q, $rootScope, $state, $stateParams, $timeout, $window, PermissionService, BroadcastEvents, VenueService, UtilsService, StateConfig, UserService) {
    "ngInject";
    this.$q = $q;
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$state = $state;
    this.$timeout = $timeout;
    this.$window = $window;

    this.PermissionService = PermissionService;
    this.BroadcastEvents = BroadcastEvents;
    this.VenueService = VenueService;
    this.UtilsService = UtilsService;
    this.UserService = UserService;

    this.hasDashboardLoaded = false;
    this.dashboardDeferred = null;
    this.isSearchingCustomers = false;

    this.isChannel = StateConfig.isChannel;
    this.domainId = $window._PREO_DATA._DOMAIN || null;
    this.baseUrl = $window._PREO_DATA._BASE_URL || '';
  }
}
