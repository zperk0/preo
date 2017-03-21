'use strict';

import venueDetails from './';

describe('venueDetails Controller', function () {

    let
      $rootScope,
      VenueDetailsCtrl,
      Spinner,
      $stateParams,
      $scope,
      $timeout,
      ErrorService,
      MapsService,
      VenueService,
      $controller,
      LabelService,
      server,
      $q,
      Snack;

    var venue = new Preoday.Venue.constructor({
      id:1,
      name:"test venue",
      latitude:111,
      longitude:112,
      address1:"street 123",
      settings:new Preoday.VenueSettings({
        venueId:1
      })
    });

    var venueResponse  = new Preoday.Venue.constructor({
      id:1,
      name:"test venue",
      latitude:123,
      longitude:124,
      settings:{
        venueId:1
      }
    });

    beforeEach(angular.mock.module('webapp'));
    beforeEach(angular.mock.module(venueDetails));

    beforeEach(angular.mock.inject(function ($injector) {
      server = sinon.fakeServer.create();
      $rootScope = $injector.get('$rootScope');
      $controller = $injector.get('$controller');
      $timeout = $injector.get('$timeout');
      $stateParams = $injector.get('$stateParams');
      LabelService = $injector.get('LabelService');
      ErrorService = $injector.get('ErrorService');
      MapsService = $injector.get('MapsService');
      VenueService = $injector.get('VenueService');
      Snack = $injector.get('Snack');
      Spinner = $injector.get('Spinner');
      $q = $injector.get('$q');
      $scope = $rootScope.$new();
    }));

    afterEach(function() {

      server.restore();
    });

    beforeEach(function(){
      $stateParams.venueId=9;
    });

    function _startController(ngModel = []) {
      VenueService.currentVenue = venue;
      VenueDetailsCtrl = $controller('venueDetailsController', {
        '$scope': $scope
      });
    }


    it("Init should set  a copy of venue", function() {

      VenueService.currentVenue = venue;
      _startController();
      $rootScope.$digest();
      expect(VenueDetailsCtrl.venue).toEqual(venue);
      $timeout.flush();
      expect(VenueDetailsCtrl.showMap).toEqual(true);     
    });


    it("When save success, should update service's venue", function() {
      spyOn(VenueService,'updateVenue').and.callFake(function(){return $q.resolve(venue)})
      _startController();
      spyOn(angular, 'extend').and.callThrough();
      VenueDetailsCtrl.submit();
      $rootScope.$digest();
      expect(angular.extend).toHaveBeenCalledWith(VenueDetailsCtrl.venue, venue);
      expect(angular.extend).toHaveBeenCalledWith(venue, venue);     
    });

    it("Drop should set lat lng and submit venue", function() {
      VenueService.currentVenue = venue;
      _startController();
      server.respondWith('PUT', '/venues/' + venue.id, [200, {"Content-Type": "application/json"}, JSON.stringify(venueResponse)]);
      spyOn(angular,'extend').and.callThrough();
      $rootScope.$digest();
      $timeout.flush();
      VenueDetailsCtrl.onMarkerDrop(123,124);
      expect(VenueDetailsCtrl.venue.latitude).toBe(123)
      expect(VenueDetailsCtrl.venue.longitude).toBe(124)

      server.respond();
      $rootScope.$digest();

      expect(VenueDetailsCtrl.venue.latitude).toBe(123)
      expect(VenueDetailsCtrl.venue.longitude).toBe(124)
      $rootScope.$digest();

    });

    it("When save errors, should not update service's venue", function() {
      spyOn(VenueService,'updateVenue').and.callFake(function(){return $q.reject(venue)})
      _startController();
 
      spyOn(Snack,'show').and.callThrough();
      spyOn(Snack,'showError').and.callThrough();
      VenueDetailsCtrl.submit();
      $rootScope.$digest();
     
      expect(Snack.showError).toHaveBeenCalled();
      expect(Snack.show).not.toHaveBeenCalled();
    });

    /*it("When saving the form should search for location's address in google", function() {
      spyOn(Preoday.VenueTaxSettings, 'get').and.callFake(function(){return $q.reject({status:400, message:"Not found"})});
     // spyOn(MapsService, 'getGeoLocationByAddress').and.callFake(function(){return $q.resolve({lat:function(){return '123.123'}, lng:function(){return '456'}})});
      _startController();

      VenueDetailsCtrl.venueDetailsForm = {
        $valid:true,
        $setSubmitted:function(){}
      }

      VenueDetailsCtrl.debounceUpdate(true);
      $rootScope.$digest();
      expect(MapsService.getGeoLocationByAddress).toHaveBeenCalled();
      $rootScope.$digest();
      expect(VenueDetailsCtrl.venue.latitude).toBe("123.123")
      expect(VenueDetailsCtrl.venue.longitude).toBe("456")
    });*/

});