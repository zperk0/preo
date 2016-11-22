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
      $q,
      Snack;

    var venue = new Preoday.Venue.constructor({
      id:1,
      name:"test venue",
      settings:new Preoday.VenueSettings({
        venueId:1
      })
    });

    beforeEach(angular.mock.module('webapp'));
    beforeEach(angular.mock.module(venueDetails));

    beforeEach(angular.mock.inject(function ($injector) {
      $rootScope = $injector.get('$rootScope');
      $controller = $injector.get('$controller');
      $timeout = $injector.get('$timeout');
      $stateParams = $injector.get('$stateParams');
      LabelService = $injector.get('LabelService');
      ErrorService = $injector.get('ErrorService');
      MapsService = $injector.get('MapsService');
      VenueService = $injector.get('VenueService');
      Spinner = $injector.get('Spinner');
      $q = $injector.get('$q');
      $scope = $rootScope.$new();
    }));

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
      spyOn(angular, 'copy').and.callThrough();
      _startController();
      $rootScope.$digest();
      expect(angular.copy).toHaveBeenCalledWith(VenueDetailsCtrl.venue);
      expect(VenueDetailsCtrl.venue.id).toEqual(venue.id);
    });


    it("When save success, should update service's venue", function() {
      spyOn(venue,'update').and.callFake(function(){return $q.resolve(venue)})
      _startController();
      spyOn(angular, 'extend').and.callThrough();
      VenueDetailsCtrl.doUpdate();
      $rootScope.$digest();
      expect(angular.extend).toHaveBeenCalledWith(VenueDetailsCtrl.venue, venue);
      expect(angular.extend).toHaveBeenCalledWith(venue, venue);
      expect(angular.extend.calls.count()).toBe(1);
    });

    it("When save errors, should not update service's venue", function() {
      spyOn(venue,'update').and.callFake(function(){return $q.reject(venue)})
      _startController();
      spyOn(angular, 'extend').and.callThrough();
      VenueDetailsCtrl.doUpdate();
      $rootScope.$digest();
      expect(angular.extend).not.toHaveBeenCalled();
    });

    it("When saving the form should search for location's address in google", function() {
      spyOn(Preoday.VenueTaxSettings, 'get').and.callFake(function(){return $q.reject({status:400, message:"Not found"})});
      spyOn(MapsService, 'getGeoLocationByAddress').and.callFake(function(){return $q.resolve({lat:function(){return '123.123'}, lng:function(){return '456'}})});
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
    });

});