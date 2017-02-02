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
      OutletLocationService,
      VenueService,
      EventScheduleFrequency,
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
      OutletLocationService = $injector.get('OutletLocationService');
      VenueService = $injector.get('VenueService');
      EventScheduleFrequency = $injector.get('EventScheduleFrequency');
      Spinner = $injector.get('Spinner');
      Snack = $injector.get('Snack');
      $timeout = $injector.get('$timeout');
      $q = $injector.get('$q');
      $scope = $rootScope.$new();

      server = sinon.fakeServer.create();

      currentVenue = new Preoday.Venue.constructor({
        id: 5,
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

      expect($scope.eventListViewCtrl.toggleMode).toEqual(jasmine.any(Function));
      expect($scope.eventListViewCtrl.isCalendarMode).toEqual(jasmine.any(Function));
      expect($scope.eventListViewCtrl.getDayEventsName).toEqual(jasmine.any(Function));
      expect($scope.eventListViewCtrl.setDayContent).toEqual(jasmine.any(Function));
      expect($scope.eventListViewCtrl.getEventByDate).toEqual(jasmine.any(Function));
      expect($scope.eventListViewCtrl.getDayEvents).toEqual(jasmine.any(Function));
      expect($scope.eventListViewCtrl.getEventsName).toEqual(jasmine.any(Function));
      expect($scope.eventListViewCtrl.hideSpinner).toEqual(jasmine.any(Function));
      expect($scope.eventListViewCtrl.loaded).toBe(false);
      expect($scope.eventListViewCtrl.isCalendarMode()).toBe(false);
      expect(Spinner.show).toHaveBeenCalledWith('events');
      expect(EventService.getEvents).toHaveBeenCalled();
    });

    it("Should initialize the controller and fetch events", function(done) {

      spyOn(OutletLocationService, 'getOutletLocations').and.callThrough();
      spyOn(EventService, 'getEvents').and.callThrough();
      spyOn(Spinner, 'show').and.callThrough();

      var events = [{
        id: 1,
        name: 'test',
        schedules: [{
          startDate: moment(),
          freq: EventScheduleFrequency.ONCE
        }]
      }];

      var outletLocations = [{
        id: 1,
        name: 'test'
      }];

      var pastDate = moment().subtract(7, 'days').format('YYYY/M/D');

      server.respondWith('GET', '/api/venues/' + currentVenue.id + '/events?after=' + pastDate.replace(/\//g, '%2F') + '&expand=schedules%2Cslots', [200, {"Content-Type": "application/json"}, JSON.stringify(events)]);
      server.respondWith('GET', '/api/venues/' + currentVenue.id + '/outletlocations?outlets=false', [200, {"Content-Type": "application/json"}, JSON.stringify(outletLocations)]);
      server.respondWith('GET', '/api/slots/slotConfig?venueId=' + currentVenue.id, [200, {"Content-Type": "application/json"}, JSON.stringify([])]);

      _startController();

      spyOn($scope.eventListViewCtrl, 'hideSpinner').and.callThrough();

      setTimeout(function () {

        server.respond();

        $rootScope.$digest();

        setTimeout(function() {

          $rootScope.$digest();
          $scope.eventListViewCtrl.expandSchedules();

          expect($scope.eventListViewCtrl.loaded).toBe(true);
          expect(Spinner.show).toHaveBeenCalledWith('events');
          expect(EventService.getEvents).toHaveBeenCalledWith(currentVenue.id, {
            after: pastDate,
            expand: 'schedules,slots'
          });
          expect(OutletLocationService.getOutletLocations).toHaveBeenCalled();
          expect($scope.eventListViewCtrl.hideSpinner).toHaveBeenCalled();
          expect($scope.eventListViewCtrl.data.events.length).toBe(events.length);
          expect($scope.eventListViewCtrl.data.events.length).toBe(events.length);
          expect($scope.eventListViewCtrl.getDayEventsName(moment())).toMatch(events[0].name);

          done();
        });
      });
    });

    it("Should initialize the controller and failt on fetch events", function(done) {

      spyOn(OutletLocationService, 'getOutletLocations').and.callThrough();
      spyOn(EventService, 'getEvents').and.callThrough();
      spyOn(Spinner, 'show').and.callThrough();

      var events = [{
        id: 1,
        name: 'test'
      }];

      var outletLocations = [{
        id: 1,
        name: 'test'
      }];

      var pastDate = moment().subtract(7, 'days').format('YYYY/M/D');

      server.respondWith('GET', '/api/venues/' + currentVenue.id + '/events?after=' + pastDate.replace(/\//g, '%2F') + '&expand=schedules%2Cslots', [400, {"Content-Type": "application/json"}, JSON.stringify(events)]);
      server.respondWith('GET', '/api/venues/' + currentVenue.id + '/outletlocations?outlets=false', [200, {"Content-Type": "application/json"}, JSON.stringify(outletLocations)]);
      server.respondWith('GET', '/api/slots/slotConfig?venueId=' + currentVenue.id, [200, {"Content-Type": "application/json"}, JSON.stringify([])]);

      _startController();

      spyOn($scope.eventListViewCtrl, 'hideSpinner').and.callThrough();

      setTimeout(function () {

        server.respond();
        $rootScope.$digest();

        setTimeout(function() {

          $rootScope.$digest();

          expect($scope.eventListViewCtrl.loaded).toBe(true);
          expect(Spinner.show).toHaveBeenCalledWith('events');
          expect(EventService.getEvents).toHaveBeenCalledWith(currentVenue.id, {
            after: pastDate,
            expand: 'schedules,slots'
          });
          expect(OutletLocationService.getOutletLocations).toHaveBeenCalled();
          expect($scope.eventListViewCtrl.hideSpinner).toHaveBeenCalled();
          expect($scope.eventListViewCtrl.data.events.length).toBe(0);

          done();
        });
      });
    });

    it("Should set the calendar mode", function() {

      _startController();

      spyOn($scope.eventListViewCtrl, 'expandSchedules');

      $scope.eventListViewCtrl.toggleMode();
      $timeout.flush();

      expect($scope.eventListViewCtrl.isCalendarMode()).toBe(true);
      expect($scope.eventListViewCtrl.expandSchedules).toHaveBeenCalled();

    });

    it("Should show message for multiples events in a day", function(done) {

      spyOn(OutletLocationService, 'getOutletLocations').and.callThrough();
      spyOn(EventService, 'getEvents').and.callThrough();
      spyOn(Spinner, 'show').and.callThrough();

      var events = [{
        id: 1,
        name: 'test',
        schedules: [{
          startDate: moment(),
          occurrences: [{
            date: moment()
          }],
          freq: EventScheduleFrequency.ONCE
        }]
      }, {
        id: 2,
        name: 'test 2',
        schedules: [{
          startDate: moment(),
          occurrences: [{
            date: moment()
          }],
          freq: EventScheduleFrequency.ONCE
        }]
      }];

      var outletLocations = [{
        id: 1,
        name: 'test'
      }];

      var pastDate = moment().subtract(7, 'days').format('YYYY/M/D');

      server.respondWith('GET', '/api/venues/' + currentVenue.id + '/events?after=' + pastDate.replace(/\//g, '%2F') + '&expand=schedules%2Cslots', [200, {"Content-Type": "application/json"}, JSON.stringify(events)]);
      server.respondWith('GET', '/api/venues/' + currentVenue.id + '/outletlocations?outlets=false', [200, {"Content-Type": "application/json"}, JSON.stringify(outletLocations)]);
      server.respondWith('GET', '/api/slots/slotConfig?venueId=' + currentVenue.id, [200, {"Content-Type": "application/json"}, JSON.stringify([])]);

      _startController();

      spyOn($scope.eventListViewCtrl, 'hideSpinner').and.callThrough();

      setTimeout(function () {

        server.respond();

        $rootScope.$digest();

        setTimeout(function() {

          $rootScope.$digest();

          $scope.eventListViewCtrl.expandSchedules();

          var rawEvents = [];

          for (let event of events) {
            for (let schedule of event.schedules) {
              for (let occurrence of schedule.occurrences) {
                let occurrenceMoment = moment(occurrence.date);
                if (occurrenceMoment.isSame(moment(), 'day')) {
                  rawEvents.push({ time: occurrenceMoment.format('HH:mm'), name: event.name, moment: occurrenceMoment.clone() });
                }
              }
            }
          }

          rawEvents = $scope.eventListViewCtrl.orderDayEvents(rawEvents);

          var eventsName = [];

          if (rawEvents && rawEvents.length) {
            for (var event of rawEvents.slice(0, 2)) {
              eventsName.push('<div class="event-calendar-item">' + event.time + ' - ' + event.name + '</div>');
            }
            if (rawEvents.slice(2).length) {
              eventsName.push('<div class="event-calendar-item remaining"> + ' + rawEvents.slice(2).length + ' more</div>');
            }
          }

          eventsName = eventsName.join('');

          expect($scope.eventListViewCtrl.loaded).toBe(true);
          expect(Spinner.show).toHaveBeenCalledWith('events');
          expect(EventService.getEvents).toHaveBeenCalledWith(currentVenue.id, {
            after: pastDate,
            expand: 'schedules,slots'
          });
          expect(OutletLocationService.getOutletLocations).toHaveBeenCalled();
          expect($scope.eventListViewCtrl.hideSpinner).toHaveBeenCalled();
          expect($scope.eventListViewCtrl.data.events.length).toBe(events.length);
          expect($scope.eventListViewCtrl.getEventsName(rawEvents)).toEqual(eventsName);
          done();
        });
      });
    });
});
