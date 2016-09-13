'use strict';

describe('Venue Service', function () {

    let
      VenueService,
      $rootScope,
      BroadcastEvents,
      server;

    beforeEach(angular.mock.module('webapp'));

    beforeEach(angular.mock.inject(function ($injector) {

      VenueService = $injector.get('VenueService');
      $rootScope = $injector.get('$rootScope');
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

      let user = {
        id: 1
      };

      server.respondWith('GET', '/api/venues?expand=settings,hours&adminId=1&roles=admin%2Cowner', [200, {"Content-Type": "application/json"}, JSON.stringify(venues)]);

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
        expect(VenueService.setCurrentVenue).toHaveBeenCalledWith(venues[0]);
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
});
