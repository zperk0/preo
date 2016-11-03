'use strict';

import deliveryZoneList from './';

describe('deliveryZoneList Controller', function () {

    let
      deliveryZoneListCtrl,
      CardItemListCtrl,
      MenuSectionItemListCtrl,
      VenueService,
      $rootScope,
      $scope,
      $stateParams,
      ItemService,
      Snack,
      Spinner,
      server,
      $controller,
      $timeout,
      $q,
      contextual,
      contextualMenu,
      mockItem;

    beforeEach(angular.mock.module('webapp'));
    beforeEach(angular.mock.module(deliveryZoneList));

    beforeEach(angular.mock.inject(function ($injector) {

      $rootScope = $injector.get('$rootScope');
      $controller = $injector.get('$controller');
      $stateParams = $injector.get('$stateParams');
      ItemService = $injector.get('ItemService');
      VenueService = $injector.get('VenueService');
      Snack = $injector.get('Snack');
      Spinner = $injector.get('Spinner');
      $timeout = $injector.get('$timeout');
      $q = $injector.get('$q');
      contextual = $injector.get('contextual');
      contextualMenu = $injector.get('contextualMenu');

      $scope = $rootScope.$new();
      $scope.scrollToBottom = () => {};
      VenueService.currentVenue = {id:5};
    }));

    afterEach(function() {

      server.restore();
      CardItemListCtrl = null;
      MenuSectionItemListCtrl = null;
    });

    function _startController() {

      deliveryZoneListCtrl = $controller('deliveryZoneListController', {
        '$scope': $scope
      }, true);

      server = sinon.fakeServer.create();
    }
});
