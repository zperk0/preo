'use strict';

import eventBasic from './';

describe('EventBasic component Controller', function () {

    let
      EventBasicCtrl,
      $rootScope,
      $scope,
      $controller,
      contextual,
      EventService,
      OutletLocationService,
      VenueService,
      Spinner,
      Snack,
      $timeout,
      $q,
      server,
      currentVenue,
      eventMock;

    beforeEach(angular.mock.module('webapp'));
    beforeEach(angular.mock.module(eventBasic));

    beforeEach(angular.mock.inject(function ($injector) {

      $controller = $injector.get('$controller');
      $rootScope = $injector.get('$rootScope');
      contextual = $injector.get('contextual');
      EventService = $injector.get('EventService');
      OutletLocationService = $injector.get('OutletLocationService');
      VenueService = $injector.get('VenueService');
      Spinner = $injector.get('Spinner');
      Snack = $injector.get('Snack');
      $timeout = $injector.get('$timeout');
      $q = $injector.get('$q');
      $scope = $rootScope.$new();

      server = sinon.fakeServer.create();

      currentVenue = new Preoday.Venue.constructor({
        id: 9,
      });
      currentVenue.setAsCurrent();

      VenueService.currentVenue = currentVenue;

    }));

    afterEach(function() {

      server.restore();
      eventMock = null;
      EventBasicCtrl = null;
    });

    function _mockEvent (data) {

      if (!data) {
        data = {};
      }

      eventMock = new Preoday.Event(angular.extend({
        id: 1,
        name: "Test"
      }, data));
    }

    function _startController() {

      EventBasicCtrl = $controller('eventBasicController', {
        '$scope': $scope,
      }, true);
    }

    it("Should initialize the controller", function() {

      // spyOn(OutletLocationService, 'getOutletLocations').and.callThrough();

      _mockEvent();
      _startController();
      

      EventBasicCtrl.instance.event = eventMock;
      EventBasicCtrl = EventBasicCtrl();

      // spyOn(EventBasicCtrl, 'buildOutletLocationTree').and.callThrough();

      // expect(EventBasicCtrl.outletLocationTree).toBe(null);
      // expect(EventBasicCtrl.buildOutletLocationTree).toEqual(jasmine.any(Function));
      // expect(EventBasicCtrl.buildTree).toEqual(jasmine.any(Function));
      // expect(EventBasicCtrl.indentNodeForSelect).toEqual(jasmine.any(Function));
      // expect(OutletLocationService.getOutletLocations).toHaveBeenCalled();
      // expect(EventBasicCtrl.buildOutletLocationTree).not.toHaveBeenCalled();
    });

    // it("Should fetch the outlet locations and build the tree", function(done) {

    //   spyOn(OutletLocationService, 'getOutletLocations').and.callThrough();

    //   _mockEvent();
    //   _startController();

    //   var outletLocations = [{
    //     id: 1,
    //     name: 'Root',
    //     parent: null,
    //     path: '/'
    //   }, {
    //     id: 2,
    //     name: 'Child',
    //     parent: 1,
    //     path: '/1/'
    //   }];

    //   server.respondWith('GET', '/api/venues/' + currentVenue.id + '/outletlocations?outlets=false', [200, {"Content-Type": "application/json"}, JSON.stringify(outletLocations)]);
      
    //   EventBasicCtrl.instance.event = eventMock;
    //   EventBasicCtrl = EventBasicCtrl();

    //   spyOn(EventBasicCtrl, 'buildOutletLocationTree').and.callThrough();
    //   spyOn(EventBasicCtrl, 'buildTree').and.callThrough();

    //   server.respond();

    //   $rootScope.$digest();

    //   setTimeout(() => {

    //     $rootScope.$digest();

    //     setTimeout(() => {

    //       $rootScope.$digest();

    //       expect(OutletLocationService.getOutletLocations).toHaveBeenCalled();
    //       expect(EventBasicCtrl.buildOutletLocationTree).toHaveBeenCalled();
    //       expect(EventBasicCtrl.buildTree).toHaveBeenCalled();          
    //       expect(EventBasicCtrl.outletLocationTree.length).toBe(outletLocations.length);
    //       expect(EventBasicCtrl.outletLocationTree[0].name).toEqual('-- ' + outletLocations[0].name);
    //       expect(EventBasicCtrl.outletLocationTree[1].name).toEqual('---- ' + outletLocations[1].name);

    //       done();
    //     });
    //   });
    // });

});
