'use strict';

import eventSchedule from './';

describe('EventSchedule Controller', function () {

    let
      EventScheduleCtrl,
      EventScheduleListCtrl,
      CardItemListCtrl,
      $rootScope,
      $scope,
      $controller,
      contextual,
      EventService,
      VenueService,
      EventScheduleFrequency,
      contextualMenu,
      Spinner,
      Snack,
      $timeout,
      $q,
      server,
      currentVenue,
      scheduleMock;

    beforeEach(angular.mock.module('webapp'));
    beforeEach(angular.mock.module(eventSchedule));

    beforeEach(angular.mock.inject(function ($injector) {

      $controller = $injector.get('$controller');
      $rootScope = $injector.get('$rootScope');
      contextual = $injector.get('contextual');
      EventService = $injector.get('EventService');
      VenueService = $injector.get('VenueService');
      EventScheduleFrequency = $injector.get('EventScheduleFrequency');
      contextualMenu = $injector.get('contextualMenu');
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
      scheduleMock = null;
      CardItemListCtrl = null;
      EventScheduleCtrl = null;
      EventScheduleListCtrl = null;
    });

    function _mockSchedule (data) {

      if (!data) {
        data = {};
      }

      scheduleMock = new Preoday.EventSchedule(angular.extend({
        id: 1,
        startDate: moment().subtract(2, 'day').format('YYYY-MM-DDThh:mm:ss.000'),
        endDate: moment().add(2, 'day').format('YYYY-MM-DDThh:mm:ss.000'),
        eventId: 1
      }, data));
    }

    function _startController() {

      EventScheduleCtrl = $controller('eventScheduleController', {
        '$scope': $scope,
      }, true);
    }

    function _startCardItemListController() {

      CardItemListCtrl = $controller('cardItemListController', {
        '$scope': $scope,
      }, true);
    }

    function _startEventScheduleListController() {

      EventScheduleListCtrl = $controller('eventScheduleListController', {
        
      }, true);
    }

    it("Should initialize the controller", function() {

      spyOn(contextual, 'showMenu').and.callThrough();

      _mockSchedule();
      _startController();      

      EventScheduleCtrl.instance.schedule = scheduleMock;
      EventScheduleCtrl = EventScheduleCtrl();

      expect(EventScheduleCtrl.type).toBe('eventSchedule');
      expect(EventScheduleCtrl.onDelete).toEqual(jasmine.any(Function));
      expect(EventScheduleCtrl.onEdit).toEqual(jasmine.any(Function));
      expect(EventScheduleCtrl.updateSchedule).toEqual(jasmine.any(Function));
      expect(EventScheduleCtrl.contextualMenuSuccess).toEqual(jasmine.any(Function));
      expect(EventScheduleCtrl.contextualMenuCancel).toEqual(jasmine.any(Function));
      expect(EventScheduleCtrl.restoreOriginalValues).toEqual(jasmine.any(Function));
      expect(contextual.showMenu).not.toHaveBeenCalled();
    });

    it("Should open drawer because doenst have an id", function() {

      spyOn(contextual, 'showMenu').and.callThrough();

      _mockSchedule();
      _startController();

      scheduleMock.id = null;

      EventScheduleCtrl.instance.schedule = scheduleMock;
      EventScheduleCtrl = EventScheduleCtrl();

      expect(contextual.showMenu).toHaveBeenCalledWith(EventScheduleCtrl.type, EventScheduleCtrl.schedule, jasmine.any(Function), jasmine.any(Function));
    });

    it("Should delete a schedule", function(done) {

      _mockSchedule();
      _startCardItemListController();
      _startController();

      EventScheduleCtrl.instance.schedule = scheduleMock;
      EventScheduleCtrl.instance.cardItemList = CardItemListCtrl();
      EventScheduleCtrl = EventScheduleCtrl();

      spyOn(EventScheduleCtrl.Spinner, 'show').and.callThrough();
      spyOn(EventScheduleCtrl.Spinner, 'hide').and.callThrough();
      spyOn(EventScheduleCtrl.Snack, 'show').and.callThrough();
      spyOn(EventScheduleCtrl.Snack, 'showError').and.callThrough();
      spyOn(EventScheduleCtrl.cardItemList, 'onItemDeleted').and.callThrough();
      spyOn(EventScheduleCtrl.DialogService, 'delete').and.callFake(function () {
        
        return $q.resolve();
      });

      server.respondWith('PUT', '/api/schedules/' + scheduleMock.id, [200, {"Content-Type": "application/json"}, JSON.stringify({})]);

      EventScheduleCtrl.onDelete();
      $rootScope.$digest();

      setTimeout(function () {

        server.respond();

        setTimeout(function () {
          
          $rootScope.$digest();

          expect(EventScheduleCtrl.Spinner.show).toHaveBeenCalled();
          expect(EventScheduleCtrl.Spinner.show).toHaveBeenCalled();
          expect(EventScheduleCtrl.Snack.show).toHaveBeenCalled();
          expect(EventScheduleCtrl.Snack.showError).not.toHaveBeenCalled();
          expect(EventScheduleCtrl.cardItemList.onItemDeleted).toHaveBeenCalledWith(EventScheduleCtrl.schedule);

          done();          
        });
      });
    });

    it("Should show default error message on delete schedule", function(done) {

      _mockSchedule();
      _startCardItemListController();
      _startEventScheduleListController();
      _startController();

      EventScheduleCtrl.instance.schedule = scheduleMock;
      EventScheduleCtrl.instance.cardItemList = CardItemListCtrl();
      EventScheduleCtrl = EventScheduleCtrl();

      spyOn(EventScheduleCtrl.Spinner, 'show').and.callThrough();
      spyOn(EventScheduleCtrl.Spinner, 'hide').and.callThrough();
      spyOn(EventScheduleCtrl.Snack, 'show').and.callThrough();
      spyOn(EventScheduleCtrl.Snack, 'showError').and.callThrough();
      spyOn(EventScheduleCtrl.cardItemList, 'onItemDeleted').and.callThrough();
      spyOn(EventScheduleCtrl.DialogService, 'delete').and.callFake(function () {
        
        return $q.resolve();
      });

      server.respondWith('PUT', '/api/schedules/' + scheduleMock.id, [400, {"Content-Type": "application/json"}, JSON.stringify({
        message: ''
      })]);

      EventScheduleCtrl.onDelete();
      $rootScope.$digest();

      setTimeout(function () {

        server.respond();

        setTimeout(function () {
          
          $rootScope.$digest();

          expect(EventScheduleCtrl.Spinner.show).toHaveBeenCalled();
          expect(EventScheduleCtrl.Spinner.hide).toHaveBeenCalled();
          expect(EventScheduleCtrl.Snack.show).not.toHaveBeenCalled();
          expect(EventScheduleCtrl.Snack.showError).toHaveBeenCalled();
          expect(EventScheduleCtrl.cardItemList.onItemDeleted).not.toHaveBeenCalled();

          done();          
        });
      });
    });

    it("Should update a schedule", function(done) {

      _mockSchedule();
      _startCardItemListController();
      _startController();

      EventScheduleCtrl.instance.schedule = scheduleMock;
      EventScheduleCtrl.instance.cardItemList = CardItemListCtrl();
      EventScheduleCtrl = EventScheduleCtrl();

      spyOn(EventScheduleCtrl.schedule, 'update').and.callThrough();
      spyOn(EventScheduleCtrl.Spinner, 'show').and.callThrough();
      spyOn(EventScheduleCtrl.Spinner, 'hide').and.callThrough();
      spyOn(EventScheduleCtrl.Snack, 'show').and.callThrough();
      spyOn(EventScheduleCtrl.Snack, 'showError').and.callThrough();

      server.respondWith('PUT', '/api/schedules/' + scheduleMock.id, [200, {"Content-Type": "application/json"}, JSON.stringify(scheduleMock)]);

      EventScheduleCtrl.updateSchedule();
      $rootScope.$digest();

      setTimeout(function () {

        server.respond();

        setTimeout(function () {
          
          $rootScope.$digest();

          expect(EventScheduleCtrl.schedule.update).toHaveBeenCalled();
          expect(EventScheduleCtrl.Spinner.show).toHaveBeenCalled();
          expect(EventScheduleCtrl.Spinner.hide).toHaveBeenCalled();
          expect(EventScheduleCtrl.Snack.show).toHaveBeenCalled();
          expect(EventScheduleCtrl.Snack.showError).not.toHaveBeenCalled();

          done();          
        });
      });
    });

    it("Should return the correct time", function() {

      _mockSchedule();
      _startCardItemListController();
      _startController();

      scheduleMock.startDate = moment().subtract(2, 'day').hours(4).minutes(5);

      EventScheduleCtrl.instance.schedule = scheduleMock;
      EventScheduleCtrl.instance.cardItemList = CardItemListCtrl();
      EventScheduleCtrl = EventScheduleCtrl();

      expect(EventScheduleCtrl.getScheduleTime()).toEqual('04:05');
    });

    it("Should return ONCE frequency title", function() {

      _mockSchedule();
      _startCardItemListController();
      _startController();

      scheduleMock.startDate = moment().year(2016).month(9).date(2);
      scheduleMock.freq = EventScheduleFrequency.ONCE;

      EventScheduleCtrl.instance.schedule = scheduleMock;
      EventScheduleCtrl.instance.cardItemList = CardItemListCtrl();
      EventScheduleCtrl = EventScheduleCtrl();

      expect(EventScheduleCtrl.getScheduleTitle()).toEqual('02/10/2016');
    });

    it("Should return DEFAULT frequency title", function() {

      _mockSchedule();
      _startCardItemListController();
      _startController();

      scheduleMock.startDate = moment().year(2016).month(9).date(2);
      scheduleMock.endDate = moment().year(2017).month(9).date(5);
      scheduleMock.freq = EventScheduleFrequency.WEEKLY;

      EventScheduleCtrl.instance.schedule = scheduleMock;
      EventScheduleCtrl.instance.cardItemList = CardItemListCtrl();
      EventScheduleCtrl = EventScheduleCtrl();

      expect(EventScheduleCtrl.getScheduleTitle()).toEqual('02/10/2016 - 05/10/2017');
    });

});