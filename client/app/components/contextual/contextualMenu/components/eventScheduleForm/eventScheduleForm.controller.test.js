'use strict';

import eventScheduleForm from './';

describe('EventScheduleForm component Controller', function () {

    let
      EventScheduleFormCtrl,
      $rootScope,
      $scope,
      $controller,
      VenueService,
      EventScheduleFrequency,
      server,
      currentVenue,
      scheduleMock;

    beforeEach(angular.mock.module('webapp'));
    beforeEach(angular.mock.module(eventScheduleForm));

    beforeEach(angular.mock.inject(function ($injector) {

      $controller = $injector.get('$controller');
      $rootScope = $injector.get('$rootScope');
      VenueService = $injector.get('VenueService');
      EventScheduleFrequency = $injector.get('EventScheduleFrequency');
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
      scheduleMock = null;
      EventScheduleFormCtrl = null;
    });

    function _mockSchedule (data) {

      if (!data) {
        data = {};
      }

      scheduleMock = new Preoday.EventSchedule(angular.extend({
        id: 1,
        startDate: moment().subtract(2, 'day').format('YYYY-MM-DDThh:mm:ss.000'),
        endDate: moment().add(2, 'day').format('YYYY-MM-DDThh:mm:ss.000'),
      }, data));
    }

    function _startController() {

      EventScheduleFormCtrl = $controller('eventScheduleFormController', {
        '$scope': $scope,
      }, true);
    }

    it("Should initialize the controller", function() {

      _mockSchedule();
      _startController();
      

      EventScheduleFormCtrl.instance.schedule = scheduleMock;
      EventScheduleFormCtrl = EventScheduleFormCtrl();

      expect(EventScheduleFormCtrl.isOnceFrequency).toEqual(jasmine.any(Function));
      // expect(EventScheduleFormCtrl.schedules.length).toBe(3);
      expect(EventScheduleFormCtrl.schedules[0].value).toEqual(EventScheduleFrequency.ONCE);
      expect(EventScheduleFormCtrl.schedules[1].value).toEqual(EventScheduleFrequency.DAILY);
      expect(EventScheduleFormCtrl.schedules[2].value).toEqual(EventScheduleFrequency.WEEKLY);
    });

    it("Should be a ONCE frequency", function() {

      _mockSchedule();
      _startController();
      
      scheduleMock.freq = EventScheduleFrequency.ONCE;

      EventScheduleFormCtrl.instance.schedule = scheduleMock;
      EventScheduleFormCtrl = EventScheduleFormCtrl();

      expect(EventScheduleFormCtrl.isOnceFrequency()).toBe(true);
    });

    it("Shouldn't be a ONCE frequency", function() {

      _mockSchedule();
      _startController();
      
      scheduleMock.freq = EventScheduleFrequency.WEEKLY;

      EventScheduleFormCtrl.instance.schedule = scheduleMock;
      EventScheduleFormCtrl = EventScheduleFormCtrl();

      expect(EventScheduleFormCtrl.isOnceFrequency()).toBe(false);
    });

});
