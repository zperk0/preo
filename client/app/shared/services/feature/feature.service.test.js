'use strict';

describe('Feature Service', function () {

    let
      FeatureService,
      UserService,
      VenueService,
      $rootScope,
      BroadcastEvents,
      server;

    beforeEach(angular.mock.module('webapp'));

    beforeEach(angular.mock.inject(function ($injector) {

      FeatureService = $injector.get('FeatureService');
      UserService = $injector.get('UserService');
      VenueService = $injector.get('VenueService');
      $rootScope = $injector.get('$rootScope');

      server = sinon.fakeServer.create();
    }));

    afterEach(function() {

      server.restore();
      UserService.restore();
      VenueService.restore();
    });

    function _mockCurrentVenue() {

      VenueService.currentVenue = new Preoday.Venue.constructor({
        id: 1,
        accountId: 1,
        features: []
      });
    }

    function _mockCurrentVenueWithOutletFeature() {

      _mockCurrentVenue();

      VenueService.currentVenue.features = [{
        id: Preoday.constants.Feature.OUTLET
      }];
    }

    it("Shouldn't have the Outlet feature", function() {

      spyOn(FeatureService, 'getLocalFeature').and.callThrough();
      spyOn(UserService, 'isAdmin').and.callThrough();

      let hasOutletFeature = FeatureService.hasOutletFeature();

      expect(hasOutletFeature).toBe(false);
      expect(FeatureService.getLocalFeature).toHaveBeenCalled();
      expect(UserService.isAdmin).toHaveBeenCalled();
    });

    it("Should have the Outlet feature because the user is an admin", function() {

      spyOn(FeatureService, 'getLocalFeature').and.callThrough();
      spyOn(UserService, 'isAdmin').and.callThrough();

      UserService.user = {$admin:true}

      let hasOutletFeature = FeatureService.hasOutletFeature();

      expect(hasOutletFeature).toBe(true);
      expect(FeatureService.getLocalFeature).not.toHaveBeenCalled();
      expect(UserService.isAdmin).toHaveBeenCalled();
    });

    it("Should have the Outlet feature and resolve the promise", function(done) {

      _mockCurrentVenueWithOutletFeature();

      spyOn(FeatureService, 'getLocalFeature').and.callThrough();
      spyOn(UserService, 'isAdmin').and.callThrough();
      spyOn(VenueService.currentVenue, 'hasFeature').and.callThrough();

      let resolve = jasmine.createSpy('resolve');
      let reject = jasmine.createSpy('reject');

      FeatureService.hasFeature(Preoday.constants.Feature.OUTLET)
        .then(resolve, reject);

      $rootScope.$digest();

      setTimeout(() => {

        $rootScope.$digest();

        setTimeout(() => {

          $rootScope.$digest();

          let hasOutletFeature = FeatureService.hasOutletFeature();

          expect(hasOutletFeature).not.toBe(false);
          expect(hasOutletFeature.id).toBe(Preoday.constants.Feature.OUTLET);
          expect(FeatureService.getLocalFeature).toHaveBeenCalled();
          expect(UserService.isAdmin).toHaveBeenCalled();
          expect(VenueService.currentVenue.hasFeature).toHaveBeenCalled();
          expect(resolve).toHaveBeenCalled();
          expect(reject).not.toHaveBeenCalled();

          done();
        });
      });
    });

    it("Should reject the promise because the feature was not found", function(done) {

      _mockCurrentVenue();

      spyOn(FeatureService, 'getLocalFeature').and.callThrough();
      spyOn(UserService, 'isAdmin').and.callThrough();
      spyOn(VenueService.currentVenue, 'hasFeature').and.callThrough();

      let resolve = jasmine.createSpy('resolve');
      let reject = jasmine.createSpy('reject');

      let url = '/api/accounts/' + VenueService.currentVenue.accountId + '/features/' + Preoday.constants.Feature.OUTLET;

      FeatureService.hasFeature(Preoday.constants.Feature.OUTLET)
        .then(resolve, reject);

      $rootScope.$digest();

      setTimeout(() => {

        $rootScope.$digest();

        setTimeout(() => {

          $rootScope.$digest();

          let hasOutletFeature = FeatureService.hasOutletFeature();

          expect(hasOutletFeature).toBe(false);
          expect(FeatureService.getLocalFeature).toHaveBeenCalled();
          expect(UserService.isAdmin).toHaveBeenCalled();
          expect(VenueService.currentVenue.hasFeature).toHaveBeenCalled();
          expect(resolve).not.toHaveBeenCalled();
          expect(reject).toHaveBeenCalled();

          done();
        });
      });
    });

});
