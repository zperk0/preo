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
      VenueService,
      $controller,
      LabelService,
      $q,
      Snack;

    var venue = new Preoday.Venue.constructor({
      id:1,
      name:"test venue",
      settings:{
        venueId:1
      }
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


    it("Init should set venue", function() {
      _startController();
      $rootScope.$digest();
      expect(VenueDetailsCtrl.venue).toEqual(venue);
    });


    it("When clicking edit should tooggle form editable", function() {
      spyOn(Preoday.VenueTaxSettings, 'get').and.callFake(function(){return $q.reject({status:400, message:"Not found"})});
      _startController();

      expect(VenueDetailsCtrl.isEdit).toEqual(false);
      VenueDetailsCtrl.toggleEdit();
      expect(VenueDetailsCtrl.isEdit).toEqual(true);
      VenueDetailsCtrl.toggleEdit();
      expect(VenueDetailsCtrl.isEdit).toEqual(false);
    });

});