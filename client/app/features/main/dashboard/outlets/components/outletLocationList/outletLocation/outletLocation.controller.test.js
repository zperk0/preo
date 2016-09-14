'use strict';

import outletLocation from './';

describe('OutletLocation item Controller', function () {

    let
      OutletLocationCtrl,
      OutletLocationListCtrl,
      $rootScope,
      $scope,
      $controller,
      contextual,
      OutletService,
      OutletLocationService,
      VenueService,
      Spinner,
      $timeout,
      server,
      currentVenue,
      outletLocations,
      outletLocationMock;

    beforeEach(angular.mock.module('webapp'));
    beforeEach(angular.mock.module(outletLocation));

    beforeEach(angular.mock.inject(function ($injector) {

      $controller = $injector.get('$controller');
      $rootScope = $injector.get('$rootScope');
      contextual = $injector.get('contextual');
      OutletService = $injector.get('OutletService');
      OutletLocationService = $injector.get('OutletLocationService');
      VenueService = $injector.get('VenueService');
      Spinner = $injector.get('Spinner');
      $timeout = $injector.get('$timeout');
      $scope = $rootScope.$new();

      server = sinon.fakeServer.create();

      currentVenue = new Preoday.Venue.constructor({
        id: 9,
      });
      currentVenue.setAsCurrent();

      VenueService.currentVenue = currentVenue;

      outletLocations = [new Preoday.OutletLocation({
        id: 1,
        venueId: currentVenue.id,
        path: '/',
        parent: null,
        name: 'First outlet to mock test'
      })];

      server.respondWith('GET', '/api/venues/' + currentVenue.id + '/outletlocations?venueId=' + currentVenue.id + '&outlets=false', [200, {"Content-Type": "application/json"}, JSON.stringify(outletLocations)]);

      OutletLocationService.getOutletLocations({
        venueId: currentVenue.id
      }).then(function () {
        console.log('success here ========');
        // done();
      }, function () {

        console.log('errrrorr here =========');
        // done();
      });

      server.respond();
    }));

    afterEach(function() {

      server.restore();
      OutletLocationService.resetGroups();
      outletLocationMock = null;
    });

    function _mockOutletLocation (data) {

      if (!data) {
        data = {};
      }

      outletLocationMock = new Preoday.OutletLocation(angular.extend({
        venueId: currentVenue.id,
        path: '/',
        parent: null,
        name: 'Mocking outlet'
      }, data));
    }

    function _mockOutlets() {

      OutletService.data.outlets = [
        new Preoday.Outlet({
          id: 1,
          name: 'Test 1'
        }),
        new Preoday.Outlet({
          id: 2,
          name: 'Test 2'
        }),
      ];
    }

    function _startController() {

      OutletLocationCtrl = $controller('outletLocationController', {
        '$scope': $scope,
      }, true);
    }

    function _startOutletLocationListController() {

      OutletLocationListCtrl = $controller('outletLocationListController', {
        '$scope': $scope,
      }, true);
    }

    it("Should initialize and open drawer to create an outletLocation", function() {

      _mockOutletLocation();
      _startController();
      
      spyOn(contextual, 'showMenu').and.callThrough();
      spyOn(OutletLocationCtrl.instance, 'buildOutlet').and.callThrough();

      OutletLocationCtrl.instance.outletLocation = outletLocationMock;
      OutletLocationCtrl = OutletLocationCtrl();

      expect(contextual.showMenu).toHaveBeenCalledWith(OutletLocationCtrl.type, outletLocationMock, jasmine.any(Function), jasmine.any(Function));
      expect(OutletLocationCtrl.type).toBe('outletLocation');
      expect(OutletLocationCtrl.buildOutlet).not.toHaveBeenCalled();
      expect(OutletLocationCtrl.outlets.length).toBe(0);
    });

    it("Should initialize with a stored outletLocation", function() {

      _mockOutletLocation();
      _startController();
      _mockOutlets();

      spyOn(contextual, 'showMenu').and.callThrough();
      spyOn(OutletLocationCtrl.instance, 'buildOutlet').and.callThrough();

      outletLocationMock.id = 2;
      outletLocationMock.outletId = 1;

      OutletLocationCtrl.instance.outletLocation = outletLocationMock;
      OutletLocationCtrl = OutletLocationCtrl();

      expect(contextual.showMenu).not.toHaveBeenCalled();
      expect(OutletLocationCtrl.type).toBe('outletLocation');
      expect(OutletLocationCtrl.buildOutlet).toHaveBeenCalled();
      expect(OutletLocationCtrl.outlets.length).toBe(1);
    });

    it("Should create an outlet location", function(done) {

      _mockOutletLocation();
      _startOutletLocationListController();
      _startController();

      OutletLocationListCtrl.instance.outletLocations = [];

      OutletLocationCtrl.instance.outletLocationListCtrl = OutletLocationListCtrl();

      spyOn(contextual, 'showMenu').and.callThrough();
      spyOn(OutletLocationCtrl.instance, 'buildOutlet').and.callThrough();
      spyOn(OutletLocationCtrl.instance, 'updateOutletLocation').and.callThrough();
      spyOn(OutletLocationCtrl.instance.outletLocationListCtrl, 'createOutletLocation').and.callThrough();
      spyOn(Spinner, 'show').and.callThrough();
      spyOn(Spinner, 'hide').and.callThrough();

      OutletLocationCtrl.instance.outletLocation = outletLocationMock;
      
      OutletLocationCtrl = OutletLocationCtrl();

      var outletCreated = angular.copy(outletLocationMock);
      outletCreated.id = 5;

      OutletLocationCtrl.contextualMenuSuccess(outletLocationMock);

      server.respondWith('POST', '/api/venues/' + outletLocationMock.venueId + '/outletlocations', [200, {"Content-Type": "application/json"}, JSON.stringify(outletCreated)]);

      setTimeout(function() {

        var rootGroup = OutletLocationService.getRootGroup();
        var outletLocationdLength = rootGroup.outletLocations.length;

        server.respond();

        setTimeout(function () {

          expect(contextual.showMenu).toHaveBeenCalledWith(OutletLocationCtrl.type, outletLocationMock, jasmine.any(Function), jasmine.any(Function));
          expect(Spinner.show).toHaveBeenCalledWith('outlet-location-create');
          expect(Spinner.hide).toHaveBeenCalledWith('outlet-location-create');
          expect(OutletLocationCtrl.type).toBe('outletLocation');
          expect(OutletLocationCtrl.buildOutlet).not.toHaveBeenCalled();
          expect(OutletLocationCtrl.updateOutletLocation).not.toHaveBeenCalled();
          expect(OutletLocationCtrl.outletLocationListCtrl.createOutletLocation).toHaveBeenCalledWith(outletLocationMock);
          expect(OutletLocationCtrl.outlets.length).toBe(0);
          expect(outletLocationdLength).toBe(2);
          expect(rootGroup.outletLocations.length).toBe(2);

          done();
        });
      });
    });

    it("Should update an outlet location", function(done) {

      _startOutletLocationListController();
      _startController();

      OutletLocationListCtrl.instance.outletLocations = [];

      OutletLocationCtrl.instance.outletLocationListCtrl = OutletLocationListCtrl();

      spyOn(contextual, 'showMenu').and.callThrough();
      spyOn(OutletLocationCtrl.instance, 'buildOutlet').and.callThrough();
      spyOn(OutletLocationCtrl.instance, 'updateOutletLocation').and.callThrough();
      spyOn(OutletLocationCtrl.instance.outletLocationListCtrl, 'createOutletLocation').and.callThrough();
      spyOn(Spinner, 'show').and.callThrough();
      spyOn(Spinner, 'hide').and.callThrough();

      OutletLocationCtrl.instance.outletLocation = outletLocations[0];
      
      OutletLocationCtrl = OutletLocationCtrl();

      OutletLocationCtrl.outletLocation.name = 'Outlet location test';

      OutletLocationCtrl.contextualMenuSuccess(OutletLocationCtrl.outletLocation);

      server.respondWith('PUT', '/api/venues/' + OutletLocationCtrl.outletLocation.venueId + '/outletlocations/' + OutletLocationCtrl.outletLocation.id, [200, {"Content-Type": "application/json"}, JSON.stringify(OutletLocationCtrl.outletLocation)]);

      setTimeout(function() {

        var rootGroup = OutletLocationService.getRootGroup();
        var outletLocationdLength = rootGroup.outletLocations.length;

        server.respond();

        setTimeout(function () {

          expect(contextual.showMenu).not.toHaveBeenCalled();
          expect(Spinner.show).toHaveBeenCalledWith('outlet-location-update');
          expect(Spinner.hide).toHaveBeenCalledWith('outlet-location-update');
          expect(OutletLocationCtrl.type).toBe('outletLocation');
          expect(OutletLocationCtrl.buildOutlet).not.toHaveBeenCalled();
          expect(OutletLocationCtrl.updateOutletLocation).toHaveBeenCalled();
          expect(OutletLocationCtrl.outletLocationListCtrl.createOutletLocation).not.toHaveBeenCalledWith(OutletLocationCtrl.outletLocation);
          expect(OutletLocationCtrl.outlets.length).toBe(0);
          expect(outletLocationdLength).toBe(1);
          expect(rootGroup.outletLocations.length).toBe(1);

          done();
        });
      });
    });


    it("Should clone an outlet location", function(done) {

      // _mockOutletLocation();
      _startOutletLocationListController();
      _startController();

      OutletLocationListCtrl.instance.outletLocations = outletLocations;

      OutletLocationCtrl.instance.outletLocationListCtrl = OutletLocationListCtrl();

      OutletLocationCtrl.instance.outletLocation = outletLocations[0];

      spyOn(contextual, 'showMenu').and.callThrough();
      spyOn(OutletLocationCtrl.instance.outletLocation, 'clone').and.callThrough();
      spyOn(OutletLocationCtrl.instance, 'buildOutlet').and.callThrough();
      spyOn(OutletLocationCtrl.instance, 'updateOutletLocation').and.callThrough();
      spyOn(OutletLocationCtrl.instance.outletLocationListCtrl, 'createOutletLocation').and.callThrough();
      spyOn(Spinner, 'show').and.callThrough();
      spyOn(Spinner, 'hide').and.callThrough();
      
      OutletLocationCtrl = OutletLocationCtrl();

      var outletCloned = angular.copy(OutletLocationCtrl.outletLocation);
      outletCloned.id = 2;

      OutletLocationCtrl.onClone({
        stopPropagation: function () {}
      });

      server.respondWith('POST', '/api/venues/' + OutletLocationCtrl.outletLocation.venueId + '/outletlocations/' + OutletLocationCtrl.outletLocation.id + '/clone', [200, {"Content-Type": "application/json"}, JSON.stringify([outletCloned])]);

      setTimeout(function() {

        var rootGroup = OutletLocationService.getRootGroup();
        var outletLocationdLength = rootGroup.outletLocations.length;

        server.respond();

        setTimeout(function () {

          expect(contextual.showMenu).not.toHaveBeenCalled();
          expect(OutletLocationCtrl.outletLocation.clone).toHaveBeenCalled();
          expect(Spinner.show).toHaveBeenCalledWith('outlet-location-clone');
          expect(Spinner.hide).toHaveBeenCalledWith('outlet-location-clone');
          expect(OutletLocationCtrl.type).toBe('outletLocation');
          expect(OutletLocationCtrl.buildOutlet).not.toHaveBeenCalled();
          expect(OutletLocationCtrl.updateOutletLocation).not.toHaveBeenCalled();
          expect(OutletLocationCtrl.outletLocationListCtrl.createOutletLocation).not.toHaveBeenCalled();
          expect(OutletLocationCtrl.outlets.length).toBe(0);
          expect(outletLocationdLength).toBe(1);
          expect(rootGroup.outletLocations.length).toBe(2);

          console.log(rootGroup.outletLocations);

          done();
        });
      });
    });

});
