'use strict';

import customTagList from './';

describe('customTagList Controller', function () {

    let
      CustomTagListCtrl,
      $rootScope,
      $scope,
      $stateParams,
      Spinner,
      Snack,
      LabelService,
      DialogService,
      VenueService,
      currentVenue,
      server,
      $controller;

    beforeEach(angular.mock.module('webapp'));
    beforeEach(angular.mock.module(customTagList));

    beforeEach(angular.mock.inject(function ($injector) {

      $rootScope = $injector.get('$rootScope');
      $controller = $injector.get('$controller');
      $stateParams = $injector.get('$stateParams');
      Spinner = $injector.get('Spinner');
      Snack = $injector.get('Snack');
      LabelService = $injector.get('LabelService');
      DialogService = $injector.get('DialogService');
      VenueService = $injector.get('VenueService');

      currentVenue = new Preoday.Venue.constructor({
        id: 9,
      });
      currentVenue.setAsCurrent();

      VenueService.currentVenue = currentVenue;

      $scope = $rootScope.$new();

      $scope.scrollToBottom = () => {};
    }));

    afterEach(function() {

      server.restore();
    });

    function _startController() {

      CustomTagListCtrl = $controller('customTagListController', {
        '$scope': $scope
      }, true);

      server = sinon.fakeServer.create();
    }

    it("Should initialize the controller", function() {

      let venueId = 5;

      $stateParams.venueId = venueId;

      _startController();

      CustomTagListCtrl = CustomTagListCtrl();

      expect(CustomTagListCtrl.showCreateCustomTag).toEqual(jasmine.any(Function));
      expect(CustomTagListCtrl.createCustomTag).toEqual(jasmine.any(Function));
      expect(CustomTagListCtrl.deleteCustomTag).toEqual(jasmine.any(Function));
      expect(CustomTagListCtrl.tryDeleteCustomTag).toEqual(jasmine.any(Function));
      expect(CustomTagListCtrl.confirmDeleteCustomTag).toEqual(jasmine.any(Function));
      expect(CustomTagListCtrl.checkExistentName).toEqual(jasmine.any(Function));
    });

    it("Should create a tag", function() {

      let venueId = 5;

      $stateParams.venueId = venueId;

      _startController();

      CustomTagListCtrl = CustomTagListCtrl();

      CustomTagListCtrl.showCreateCustomTag();

      expect(CustomTagListCtrl.customTags.length).toBe(1);
    });

    it("Shouldn't create duplicated tag", function() {

      let venueId = 5;

      $stateParams.venueId = venueId;

      _startController();

      CustomTagListCtrl = CustomTagListCtrl();

      CustomTagListCtrl.showCreateCustomTag();
      CustomTagListCtrl.showCreateCustomTag();

      expect(CustomTagListCtrl.customTags.length).toBe(1);
    });
});
