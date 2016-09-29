'use strict';

import eventList from './';

describe('EventList View Controller', function () {

    let
      EventListCtrl,
      $rootScope,
      $scope,
      $stateParams,
      $controller,
      EventService,
      VenueService,
      Spinner,
      Snack,
      $timeout,
      $q,
      server,
      currentVenue;

    beforeEach(angular.mock.module('webapp'));
    beforeEach(angular.mock.module(eventList));

    beforeEach(angular.mock.inject(function ($injector) {

      $controller = $injector.get('$controller');
      $rootScope = $injector.get('$rootScope');
      $stateParams = $injector.get('$stateParams');
      EventService = $injector.get('EventService');
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
    });

    function _startController() {

      EventListCtrl = $controller('eventListViewController as eventListViewCtrl', {
        '$scope': $scope,
      });

      $scope.eventListViewCtrl = EventListCtrl;
    }

    it("Should initialize the controller", function() {

      spyOn(EventService, 'getEvents').and.callThrough();
      spyOn(Spinner, 'show').and.callThrough();

      _startController();

      expect($scope.eventListViewCtrl.loaded).toBe(false);
      expect(Spinner.show).toHaveBeenCalledWith('events');
      expect(EventService.getEvents).toHaveBeenCalled();
    });

    it("Should initialize the controller and fetch events", function(done) {

      spyOn(EventService, 'getEvents').and.callThrough();
      spyOn(Spinner, 'show').and.callThrough();

      var venueId = 5;

      $stateParams.venueId = venueId;

      var events = [{
        id: 1,
        name: 'test'
      }];

      server.respondWith('GET', '/api/venues/' + venueId + '/events?expand=schedules', [200, {"Content-Type": "application/json"}, JSON.stringify(events)]);

      _startController();

      spyOn($scope.eventListViewCtrl, 'hideSpinner').and.callThrough();

      setTimeout(function () {
        
        server.respond();
        $rootScope.$digest();

        setTimeout(function() {

          $rootScope.$digest();

          expect($scope.eventListViewCtrl.loaded).toBe(true);
          expect(Spinner.show).toHaveBeenCalledWith('events');
          expect(EventService.getEvents).toHaveBeenCalledWith(venueId);
          expect($scope.eventListViewCtrl.hideSpinner).toHaveBeenCalled();
          expect($scope.eventListViewCtrl.data.events.length).toBe(events.length);

          done();          
        });
      });
    });

    it("Should initialize the controller and failt on fetch events", function(done) {

      spyOn(EventService, 'getEvents').and.callThrough();
      spyOn(Spinner, 'show').and.callThrough();

      var venueId = 5;

      $stateParams.venueId = venueId;

      var events = [{
        id: 1,
        name: 'test'
      }];

      server.respondWith('GET', '/api/venues/' + venueId + '/events?', [400, {"Content-Type": "application/json"}, JSON.stringify(events)]);

      _startController();

      spyOn($scope.eventListViewCtrl, 'hideSpinner').and.callThrough();

      setTimeout(function () {
        
        server.respond();
        $rootScope.$digest();

        setTimeout(function() {

          $rootScope.$digest();

          expect($scope.eventListViewCtrl.loaded).toBe(true);
          expect(Spinner.show).toHaveBeenCalledWith('events');
          expect(EventService.getEvents).toHaveBeenCalledWith(venueId);
          expect($scope.eventListViewCtrl.hideSpinner).toHaveBeenCalled();
          expect($scope.eventListViewCtrl.data.events.length).toBe(0);

          done();          
        });
      });
    });
});
