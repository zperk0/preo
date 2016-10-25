'use strict';

describe('Venue Service', function () {

    let
      VenueService,
      TaxesService,
      $rootScope,
      server,
      $timeout,
      $q;

    const taxes = [
      {"id":3,"venueId":5,"name":"VAT123","displayName":"0 VaT123","pickup":null,"delivery":null,"seat":null,"voucher":null,"booking":null},
      {"id":3,"venueId":5,"name":"Vat ","displayName":"VAAT","pickup":null,"delivery":null,"seat":null,"voucher":null,"booking":null}
    ]
    const currentVenue = {
      id:5
    }

    beforeEach(angular.mock.module('webapp'));

    beforeEach(angular.mock.inject(function ($injector) {

      VenueService = $injector.get('VenueService');
      TaxesService = $injector.get('TaxesService');
      $rootScope = $injector.get('$rootScope');
      $timeout = $injector.get('$timeout');
      $q = $injector.get('$q');

      VenueService.currentVenue = currentVenue;

      server = sinon.fakeServer.create();
    }));

    afterEach(function() {
      server.restore();
    });

    it("Should fetch taxes by venueId", function(done) {

      let resolve = jasmine.createSpy('resolve');
      let reject = jasmine.createSpy('reject');

      server.respondWith('GET', '/api/venues/5/taxes', [200, {"Content-Type": "application/json"}, JSON.stringify(taxes)]);
      TaxesService.getTaxGroups()
        .then(resolve,reject);
      server.respond();

      setTimeout(()=>{
        expect(JSON.stringify(TaxesService.taxGroups)).toEqual(JSON.stringify(taxes));
        done();
      })

      $rootScope.$digest();


   });


});
