'use strict';

import outletLocationList from './';

describe('OutletLocationList View Controller', function () {

    let
      OutletLocationListCtrl,
      $rootScope,
      $scope,
      $stateParams,
      $controller,
      VenueService,
      Spinner,
      Snack,
      server,
      mockOutletLocation,
      mockOutletLocationGroup,
      currentVenue;

    beforeEach(angular.mock.module('webapp'));
    beforeEach(angular.mock.module(outletLocationList));

    beforeEach(angular.mock.inject(function ($injector) {

      $controller = $injector.get('$controller');
      $rootScope = $injector.get('$rootScope');
      $stateParams = $injector.get('$stateParams');
      VenueService = $injector.get('VenueService');
      Spinner = $injector.get('Spinner');
      Snack = $injector.get('Snack');
      $scope = $rootScope.$new();

      server = sinon.fakeServer.create();

      currentVenue = new Preoday.Venue.constructor({
        id: 5,
      });
      currentVenue.setAsCurrent();

      VenueService.currentVenue = currentVenue;
    }));

    afterEach(function() {

      mockOutletLocation = null;
      mockOutletLocationGroup = null;
      server.restore();
      Preoday.OutletLocationGroup.resetGroups();
      Preoday.OutletLocation.resetOutlets();
    });

    function _startController() {

      OutletLocationListCtrl = $controller('outletLocationListController', {
        '$scope': $scope,
      }, true);
    }

    function _mockOutletLocation () {

      mockOutletLocation = new Preoday.OutletLocation({
        id: 1,
        venueId: currentVenue.id,
        parent: null
      });
    }

    it("Should initialize the controller", function() {

      _startController();

      mockOutletLocationGroup = Preoday.OutletLocationGroup.createGroupByOutletLocation({});

      OutletLocationListCtrl.instance.outletLocationGroup = mockOutletLocationGroup;
      OutletLocationListCtrl.instance.outletLocations = mockOutletLocationGroup.outletLocations;
      OutletLocationListCtrl = OutletLocationListCtrl();

      expect(OutletLocationListCtrl.getNewOutletLocationPosition).toEqual(jasmine.any(Function));
      expect(OutletLocationListCtrl.getPosition).toEqual(jasmine.any(Function));
      expect(OutletLocationListCtrl.deleteOutletLocation).toEqual(jasmine.any(Function));
      expect(OutletLocationListCtrl.showCreateOutletLocation).toEqual(jasmine.any(Function));
      expect(OutletLocationListCtrl.createOutletLocation).toEqual(jasmine.any(Function));
      expect(OutletLocationListCtrl.onOutletLocationMoved).toEqual(jasmine.any(Function));

      expect(OutletLocationListCtrl.outletLocations.length).toBe(0);
    });

    it("Should create an outletLocation", function() {

      let venueId = 5;

      $stateParams.venueId = venueId;

      _startController();

      mockOutletLocationGroup = Preoday.OutletLocationGroup.createGroupByOutletLocation({});

      OutletLocationListCtrl.instance.outletLocationGroup = mockOutletLocationGroup;
      OutletLocationListCtrl.instance.outletLocations = mockOutletLocationGroup.outletLocations;
      OutletLocationListCtrl = OutletLocationListCtrl();

      OutletLocationListCtrl.showCreateOutletLocation();

      expect(OutletLocationListCtrl.outletLocations.length).toBe(1);
    });

    it("Shouldn't create duplicated outletLocation", function() {

      let venueId = 5;

      $stateParams.venueId = venueId;

      _startController();

      mockOutletLocationGroup = Preoday.OutletLocationGroup.createGroupByOutletLocation({});

      OutletLocationListCtrl.instance.outletLocationGroup = mockOutletLocationGroup;
      OutletLocationListCtrl.instance.outletLocations = mockOutletLocationGroup.outletLocations;
      OutletLocationListCtrl = OutletLocationListCtrl();

      OutletLocationListCtrl.showCreateOutletLocation();
      OutletLocationListCtrl.showCreateOutletLocation();

      expect(OutletLocationListCtrl.outletLocations.length).toBe(1);
    });

    it("Shouldnt delete the outletLocation because is used for an event", function(done) {

      spyOn(Snack, 'showError').and.callThrough();
      spyOn(Snack, 'show').and.callThrough();
      spyOn(Spinner, 'show').and.callThrough();
      spyOn(Spinner, 'hide').and.callThrough();

      let venueId = 5;

      $stateParams.venueId = venueId;

      _mockOutletLocation();
      _startController();

      mockOutletLocationGroup = mockOutletLocation.getGroup();

      OutletLocationListCtrl.instance.outletLocationGroup = mockOutletLocationGroup;
      OutletLocationListCtrl.instance.outletLocations = mockOutletLocationGroup.outletLocations;
      OutletLocationListCtrl = OutletLocationListCtrl();

      server.respondWith('DELETE', '/api/venues/' + currentVenue.id + '/outletlocations/' + mockOutletLocation.id, [422, {"Content-Type": "application/json"}, JSON.stringify({
        status: 422
      })]);

      OutletLocationListCtrl.deleteOutletLocation(mockOutletLocation);

      server.respond();

      setTimeout(() => {

        $rootScope.$digest();

        expect(Spinner.show).toHaveBeenCalled();
        expect(Spinner.hide).toHaveBeenCalled();
        expect(Snack.show).not.toHaveBeenCalled();
        expect(Snack.showError).toHaveBeenCalledWith('You do not have permission to delete this outlet, please contact the support team');

        done();
      });
    });

    it("Should delete the outletLocation", function(done) {

      spyOn(Snack, 'showError').and.callThrough();
      spyOn(Snack, 'show').and.callThrough();
      spyOn(Spinner, 'show').and.callThrough();
      spyOn(Spinner, 'hide').and.callThrough();

      let venueId = 5;

      $stateParams.venueId = venueId;

      _mockOutletLocation();
      _startController();

      mockOutletLocationGroup = mockOutletLocation.getGroup();

      OutletLocationListCtrl.instance.outletLocationGroup = mockOutletLocationGroup;
      OutletLocationListCtrl.instance.outletLocations = mockOutletLocationGroup.outletLocations;
      OutletLocationListCtrl = OutletLocationListCtrl();

      expect(OutletLocationListCtrl.outletLocations.length).toBe(1);

      server.respondWith('DELETE', '/api/venues/' + currentVenue.id + '/outletlocations/' + mockOutletLocation.id, [200, {"Content-Type": "application/json"}, JSON.stringify({})]);

      OutletLocationListCtrl.deleteOutletLocation(mockOutletLocation);

      server.respond();

      setTimeout(() => {

        $rootScope.$digest();

        expect(Spinner.show).toHaveBeenCalled();
        expect(Spinner.hide).toHaveBeenCalled();
        expect(Snack.show).toHaveBeenCalled();
        expect(Snack.showError).not.toHaveBeenCalled();

        expect(OutletLocationListCtrl.outletLocations.length).toBe(0);

        done();
      });
    });
});
