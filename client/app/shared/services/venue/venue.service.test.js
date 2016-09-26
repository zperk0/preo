'use strict';

describe('Venue Service', function () {

    let
      VenueService,
      FeatureService,
      $rootScope,
      $timeout,
      BroadcastEvents,
      server;

    beforeEach(angular.mock.module('webapp'));

    beforeEach(angular.mock.inject(function ($injector) {

      VenueService = $injector.get('VenueService');
      FeatureService = $injector.get('FeatureService');
      $rootScope = $injector.get('$rootScope');
      $timeout = $injector.get('$timeout');
      BroadcastEvents = $injector.get('BroadcastEvents');

      server = sinon.fakeServer.create();
    }));

    afterEach(function() {

      server.restore();
    });

    it("Should fetch venues by userId", function(done) {

      spyOn(Preoday.Venue, 'fetch').and.callThrough();
      spyOn(VenueService, 'setCurrentVenue').and.callThrough();
      spyOn($rootScope, '$broadcast').and.callThrough();

      let resolve = jasmine.createSpy('resolve');
      let reject = jasmine.createSpy('reject');

      let venues = [
        new Preoday.Venue.constructor({id: 1,}),
        new Preoday.Venue.constructor({id: 2,}),
      ];

      spyOn(FeatureService, 'hasFeature').and.callFake(function () {
        
        return {
          then: function (callbackSuccess, callbackError) {

            callbackError();
          }
        }
      });

      let user = {
        id: 1
      };

      server.respondWith('GET', '/api/venues?expand=settings,hours,features&adminId=1&roles=admin%2Cowner', [200, {"Content-Type": "application/json"}, JSON.stringify(venues)]);

      VenueService.fetchUserVenues(user)
        .then(resolve, reject);

      server.respond();
      $rootScope.$digest();

      setTimeout(function () {

        $rootScope.$digest();

        expect(Preoday.Venue.fetch).toHaveBeenCalledWith(jasmine.objectContaining({
          adminId: 1
        }));
        expect(resolve).toHaveBeenCalled();
        expect(reject).not.toHaveBeenCalled();
        expect(VenueService.setCurrentVenue).toHaveBeenCalledWith(jasmine.objectContaining({
          id: venues[0].id
        }));
        expect($rootScope.$broadcast).toHaveBeenCalledWith(BroadcastEvents._ON_FETCH_VENUES, venues);

        done();               
      });
    });

    it("Should reject the promise", function(done) {

      spyOn(Preoday.Venue, 'fetch').and.callThrough();
      spyOn(VenueService, 'setCurrentVenue').and.callThrough();
      spyOn($rootScope, '$broadcast').and.callThrough();

      let resolve = jasmine.createSpy('resolve');
      let reject = jasmine.createSpy('reject');

      let venues = [
        new Preoday.Venue.constructor({id: 1,}),
        new Preoday.Venue.constructor({id: 2,}),
      ];

      spyOn(FeatureService, 'hasFeature').and.callFake(function () {
        
        return {
          then: function (callbackSuccess, callbackError) {

            callbackError();
          }
        }
      });

      let user = {
        id: 1
      };

      server.respondWith('GET', '/api/venues?expand=settings,hours&adminId=1&roles=admin%2Cowner', [400, {"Content-Type": "application/json"}, JSON.stringify(venues)]);

      VenueService.fetchUserVenues(user)
        .then(resolve, reject);

      server.respond();
      $rootScope.$digest();

      setTimeout(function () {

        $rootScope.$digest();

        expect(Preoday.Venue.fetch).toHaveBeenCalledWith(jasmine.objectContaining({
          adminId: 1
        }));
        expect(resolve).not.toHaveBeenCalled();
        expect(reject).toHaveBeenCalled();
        expect(VenueService.setCurrentVenue).not.toHaveBeenCalledWith(venues[0]);
        expect($rootScope.$broadcast).not.toHaveBeenCalledWith(BroadcastEvents._ON_FETCH_VENUES, venues);

        done();
      });
    });

    it("Should set the current venue", function(done) {

      spyOn(FeatureService, 'clearLocalFeatures').and.callThrough();
      spyOn(FeatureService, 'hasFeatureForInit').and.callThrough();
      spyOn(VenueService, 'checkFeatures').and.callThrough();

      let resolve = jasmine.createSpy('resolve');
      let reject = jasmine.createSpy('reject');

      let currentVenue = new Preoday.Venue.constructor({id: 1});

      VenueService.setCurrentVenue(currentVenue)
        .then(resolve, reject);

      setTimeout(function () {

        expect(currentVenue.id).toBe(VenueService.currentVenue.id);
        expect(VenueService.checkFeatures).toHaveBeenCalled();
        expect(FeatureService.clearLocalFeatures).toHaveBeenCalled();
        expect(FeatureService.hasFeatureForInit).toHaveBeenCalledWith(Preoday.constants.Feature.OUTLET);
        expect(FeatureService.hasFeatureForInit).toHaveBeenCalledWith(Preoday.constants.Feature.NESTED_MODIFIER);

        done();
      });
    });
});
