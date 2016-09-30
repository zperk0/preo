'use strict';

import event from './';

describe('Event item Controller', function () {

    let
      EventCtrl,
      EventListCtrl,
      CardItemListCtrl,
      $rootScope,
      $scope,
      $controller,
      contextual,
      EventService,
      OutletLocationService,
      VenueService,
      contextualMenu,
      Spinner,
      Snack,
      $timeout,
      $q,
      server,
      currentVenue,
      events,
      eventMock;

    beforeEach(angular.mock.module('webapp'));
    beforeEach(angular.mock.module(event));

    beforeEach(angular.mock.inject(function ($injector) {

      $controller = $injector.get('$controller');
      $rootScope = $injector.get('$rootScope');
      contextual = $injector.get('contextual');
      EventService = $injector.get('EventService');
      OutletLocationService = $injector.get('OutletLocationService');
      VenueService = $injector.get('VenueService');
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

      events = [new Preoday.Event({
        id: 1,
        name: 'Test'
      })];

    }));

    afterEach(function() {

      server.restore();
      eventMock = null;
      CardItemListCtrl = null;
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

    function _mockEvents() {

    }

    function _startController() {

      EventCtrl = $controller('eventController', {
        '$scope': $scope,
      }, true);
    }

    function _startCardItemListController() {

      CardItemListCtrl = $controller('cardItemListController', {
        '$scope': $scope,
      }, true);
    }

    function _startEventListController() {

      EventListCtrl = $controller('eventListController', {
        
      }, true);
    }

    it("Should initialize the controller", function() {

      spyOn(contextual, 'showMenu').and.callThrough();
      spyOn(OutletLocationService, 'findById').and.callThrough();

      _mockEvent();
      _startController();
      

      EventCtrl.instance.event = eventMock;
      EventCtrl = EventCtrl();

      expect(EventCtrl.type).toBe('event');
      expect(EventCtrl.onDelete).toEqual(jasmine.any(Function));
      expect(EventCtrl.toggleExpanded).toEqual(jasmine.any(Function));
      expect(EventCtrl.onEdit).toEqual(jasmine.any(Function));
      expect(EventCtrl.updateEvent).toEqual(jasmine.any(Function));
      expect(EventCtrl.contextualMenuSuccess).toEqual(jasmine.any(Function));
      expect(EventCtrl.contextualMenuCancel).toEqual(jasmine.any(Function));
      expect(EventCtrl.restoreOriginalValues).toEqual(jasmine.any(Function));
      expect(contextual.showMenu).not.toHaveBeenCalled();
      expect(OutletLocationService.findById).not.toHaveBeenCalled();
      expect(EventCtrl.outletLocations.length).toBe(0);      
    });

    it("Should open drawer because doenst have an id", function() {

      spyOn(contextual, 'showMenu').and.callThrough();

      _mockEvent();
      _startController();

      eventMock.id = null;

      EventCtrl.instance.event = eventMock;
      EventCtrl = EventCtrl();

      expect(contextual.showMenu).toHaveBeenCalledWith(EventCtrl.type, EventCtrl.event, jasmine.any(Function), jasmine.any(Function));
    });

    it("Should delete a event", function(done) {

      _mockEvent();
      _startCardItemListController();
      _startController();

      EventCtrl.instance.event = eventMock;
      EventCtrl.instance.cardItemList = CardItemListCtrl();
      EventCtrl = EventCtrl();

      spyOn(EventCtrl.Spinner, 'show').and.callThrough();
      spyOn(EventCtrl.Spinner, 'hide').and.callThrough();
      spyOn(EventCtrl.Snack, 'show').and.callThrough();
      spyOn(EventCtrl.Snack, 'showError').and.callThrough();
      spyOn(EventCtrl.cardItemList, 'onItemDeleted').and.callThrough();
      spyOn(EventCtrl.DialogService, 'delete').and.callFake(function () {
        
        return $q.resolve();
      });

      server.respondWith('PUT', '/api/events/' + eventMock.id, [200, {"Content-Type": "application/json"}, JSON.stringify({})]);

      EventCtrl.onDelete();
      $rootScope.$digest();

      setTimeout(function () {

        server.respond();

        setTimeout(function () {
          
          $rootScope.$digest();

          expect(EventCtrl.Spinner.show).toHaveBeenCalled();
          expect(EventCtrl.Spinner.show).toHaveBeenCalled();
          expect(EventCtrl.Snack.show).toHaveBeenCalled();
          expect(EventCtrl.Snack.showError).not.toHaveBeenCalled();
          expect(EventCtrl.cardItemList.onItemDeleted).toHaveBeenCalledWith(EventCtrl.event);

          done();          
        });
      });
    });

    it("Should show default error message on delete collection slot", function(done) {

      _mockEvent();
      _startCardItemListController();
      _startEventListController();
      _startController();

      EventCtrl.instance.event = eventMock;
      EventCtrl.instance.cardItemList = CardItemListCtrl();
      EventCtrl = EventCtrl();

      spyOn(EventCtrl.Spinner, 'show').and.callThrough();
      spyOn(EventCtrl.Spinner, 'hide').and.callThrough();
      spyOn(EventCtrl.Snack, 'show').and.callThrough();
      spyOn(EventCtrl.Snack, 'showError').and.callThrough();
      spyOn(EventCtrl.cardItemList, 'onItemDeleted').and.callThrough();
      spyOn(EventCtrl.DialogService, 'delete').and.callFake(function () {
        
        return $q.resolve();
      });

      server.respondWith('PUT', '/api/events/' + eventMock.id, [400, {"Content-Type": "application/json"}, JSON.stringify({
        message: ''
      })]);

      EventCtrl.onDelete();
      $rootScope.$digest();

      setTimeout(function () {

        server.respond();

        setTimeout(function () {
          
          $rootScope.$digest();

          expect(EventCtrl.Spinner.show).toHaveBeenCalled();
          expect(EventCtrl.Spinner.hide).toHaveBeenCalled();
          expect(EventCtrl.Snack.show).not.toHaveBeenCalled();
          expect(EventCtrl.Snack.showError).toHaveBeenCalled();
          expect(EventCtrl.cardItemList.onItemDeleted).not.toHaveBeenCalled();

          done();          
        });
      });
    });

    it("Should update an event", function(done) {

      _mockEvent();
      _startCardItemListController();
      _startController();

      spyOn(EventService, 'update').and.callThrough();

      EventCtrl.instance.event = eventMock;
      EventCtrl.instance.cardItemList = CardItemListCtrl();
      EventCtrl = EventCtrl();

      spyOn(EventCtrl.Spinner, 'show').and.callThrough();
      spyOn(EventCtrl.Spinner, 'hide').and.callThrough();
      spyOn(EventCtrl.Snack, 'show').and.callThrough();
      spyOn(EventCtrl.Snack, 'showError').and.callThrough();

      server.respondWith('PUT', '/api/events/' + eventMock.id, [200, {"Content-Type": "application/json"}, JSON.stringify(eventMock)]);

      EventCtrl.updateEvent();
      $rootScope.$digest();

      setTimeout(function () {

        server.respond();

        setTimeout(function () {
          
          $rootScope.$digest();

          expect(EventService.update).toHaveBeenCalledWith(EventCtrl.event);
          expect(EventCtrl.Spinner.show).toHaveBeenCalled();
          expect(EventCtrl.Spinner.hide).toHaveBeenCalled();
          expect(EventCtrl.Snack.show).toHaveBeenCalled();
          expect(EventCtrl.Snack.showError).not.toHaveBeenCalled();

          done();          
        });
      });
    });

    it("Should build the event with outletLocation", function() {

      _mockEvent();
      _startCardItemListController();
      _startController();

      var outletLocationMock = {
        id: 1,
        name: 'Outlet Location Test'
      };

      eventMock.outletLocationId = 1;

      spyOn(OutletLocationService, 'findById').and.callFake(function () {
        
        return outletLocationMock;
      });      

      EventCtrl.instance.event = eventMock;
      EventCtrl.instance.cardItemList = CardItemListCtrl();
      EventCtrl = EventCtrl();
          
      $rootScope.$digest();

      expect(OutletLocationService.findById).toHaveBeenCalledWith(eventMock.outletLocationId);
      expect(EventCtrl.outletLocations.length).toBe(1);
      expect(EventCtrl.outletLocations[0].name).toEqual(outletLocationMock.name);
    });

    it("Should remove the outletLocationId from the event", function(done) {

      _mockEvent();
      _startCardItemListController();
      _startController();

      var outletLocationMock = {
        id: 1,
        name: 'Outlet Location Test'
      };

      eventMock.outletLocationId = 1;

      spyOn(OutletLocationService, 'findById').and.callFake(function () {
        
        return outletLocationMock;
      });      

      server.respondWith('PUT', '/api/events/' + eventMock.id, [200, {"Content-Type": "application/json"}, JSON.stringify(eventMock)]);

      EventCtrl.instance.event = eventMock;
      EventCtrl.instance.cardItemList = CardItemListCtrl();
      EventCtrl = EventCtrl();
          
      $rootScope.$digest();

      spyOn(EventCtrl, 'buildOutletLocation').and.callThrough();
      spyOn(EventCtrl, 'updateEvent').and.callThrough();

      EventCtrl.removeOutletLocation();

      $rootScope.$digest();

      setTimeout(function () {

        server.respond();
        $rootScope.$digest();

        setTimeout(function () {

          $rootScope.$digest();
          
          expect(EventCtrl.updateEvent).toHaveBeenCalled();
          expect(EventCtrl.buildOutletLocation).toHaveBeenCalled();
          expect(EventCtrl.event.outletLocationId).toBe(null);
          expect(EventCtrl.outletLocations.length).toBe(0);

          done();
        });
      });
    });

    it("Should add the outletLocationId to an event", function(done) {

      _mockEvent();
      _startCardItemListController();
      _startController();

      var outletLocationMock = {
        id: 3,
        name: 'Outlet Location Test'
      };

      spyOn(OutletLocationService, 'findById').and.callFake(function () {
        
        return outletLocationMock;
      });

      spyOn(contextual, 'showDrawer').and.returnValue($q.resolve(outletLocationMock));

      server.respondWith('PUT', '/api/events/' + eventMock.id, [200, {"Content-Type": "application/json"}, JSON.stringify(eventMock)]);

      EventCtrl.instance.event = eventMock;
      EventCtrl.instance.cardItemList = CardItemListCtrl();
      EventCtrl = EventCtrl();
          
      $rootScope.$digest();

      spyOn(EventCtrl, 'buildOutletLocation').and.callThrough();
      spyOn(EventCtrl, 'updateEvent').and.callThrough();

      EventCtrl.onAddOutletLocation();

      $rootScope.$digest();

      setTimeout(function () {

        server.respond();
        $rootScope.$digest();

        setTimeout(function () {

          $rootScope.$digest();
          
          expect(EventCtrl.updateEvent).toHaveBeenCalled();
          expect(EventCtrl.buildOutletLocation).toHaveBeenCalled();
          expect(EventCtrl.event.outletLocationId).toBe(outletLocationMock.id);
          expect(EventCtrl.outletLocations.length).toBe(1);
          expect(EventCtrl.outletLocations[0].name).toEqual(outletLocationMock.name);

          done();
        });
      });
    });

    it("Shouldn't call the event update when select the same outletLocation", function(done) {

      _mockEvent();
      _startCardItemListController();
      _startController();

      var outletLocationMock = {
        id: 3,
        name: 'Outlet Location Test'
      };

      eventMock.outletLocationId = outletLocationMock.id;

      spyOn(OutletLocationService, 'findById').and.callFake(function () {
        
        return outletLocationMock;
      });

      spyOn(contextual, 'showDrawer').and.returnValue($q.resolve(outletLocationMock));

      EventCtrl.instance.event = eventMock;
      EventCtrl.instance.cardItemList = CardItemListCtrl();
      EventCtrl = EventCtrl();
          
      $rootScope.$digest();

      spyOn(EventCtrl, 'buildOutletLocation').and.callThrough();
      spyOn(EventCtrl, 'updateEvent').and.callThrough();

      EventCtrl.onAddOutletLocation();

      $rootScope.$digest();

      setTimeout(function () {

        $rootScope.$digest();
        
        expect(EventCtrl.updateEvent).not.toHaveBeenCalled();
        expect(EventCtrl.buildOutletLocation).not.toHaveBeenCalled();
        expect(EventCtrl.event.outletLocationId).toBe(outletLocationMock.id);
        expect(EventCtrl.outletLocations.length).toBe(1);
        expect(EventCtrl.outletLocations[0].name).toEqual(outletLocationMock.name);

        done();
      });
    });

    // it("Should create an event", function(done) {

    //   _mockEvent();
    //   _startCardItemListController();
    //   _startController();

    //   spyOn(EventService, 'save').and.callThrough();

    //   eventMock.id = null;
    //   eventMock.name = 'Tester';

    //   EventCtrl.instance.event = eventMock;
    //   EventCtrl.instance.cardItemList = CardItemListCtrl();
    //   EventCtrl.instance.eventListCtrl = EventListCtrl();
    //   EventCtrl = EventCtrl();

    //   spyOn(EventCtrl.Spinner, 'show').and.callThrough();
    //   spyOn(EventCtrl.Spinner, 'hide').and.callThrough();
    //   spyOn(EventCtrl.Snack, 'show').and.callThrough();
    //   spyOn(EventCtrl.Snack, 'showError').and.callThrough();
    //   spyOn(EventCtrl.eventListCtrl, 'createEvent').and.callThrough();
    //   spyOn(EventCtrl.cardItemList, 'onItemCreated').and.callThrough();
    //   spyOn(contextualMenu, 'hide').and.callThrough();
    //   spyOn(Preoday.Event, 'create').and.callFake(function () {
        
    //     return {
    //       then: function (callbackSuccess) {
            
    //         callbackSuccess();
    //       }
    //     }
    //   });

    //   // server.respondWith('POST', '/api/venues/' + currentVenue.id + '/events', [200, {"Content-Type": "application/json"}, JSON.stringify({})]);

    //   EventCtrl.contextualMenuSuccess(EventCtrl.event);
    //   // server.respond();

    //   setTimeout(function () {

        
    //     $rootScope.$digest();

    //     setTimeout(function () {
          
    //       $rootScope.$digest();
    //       $timeout.flush();

    //       setTimeout(() => {

    //         $rootScope.$digest();
    //         $timeout.flush();
    //         $rootScope.$digest();

    //         expect(EventService.save).toHaveBeenCalledWith(EventCtrl.event);
    //         expect(EventCtrl.eventListCtrl.createEvent).toHaveBeenCalledWith(EventCtrl.event);
    //         expect(EventCtrl.cardItemList.onItemCreated).toHaveBeenCalledWith(jasmine.any(Preoday.Event));
    //         expect(EventCtrl.Spinner.show).toHaveBeenCalled();
    //         expect(EventCtrl.Spinner.hide).toHaveBeenCalled();
    //         expect(EventCtrl.Snack.show).toHaveBeenCalled();
    //         expect(contextualMenu.hide).toHaveBeenCalled();
    //         expect(EventCtrl.Snack.showError).not.toHaveBeenCalled();

    //         done(); 
    //       });         
    //     });
    //   });
    // });

});
