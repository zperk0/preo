'use strict';

describe('SellerDetails Controller', function () {

    let
      SellerDetailsCtrl,
      Spinner,
      $stateParams,
      $scope,
      $timeout,
      ErrorService,
      $controller,
      LabelService,
      $q,
      Snack;

    var settingsMock = {
      venueId:1,
      taxId:"123456"
    }

    beforeEach(angular.mock.module('webapp'));

    beforeEach(angular.mock.inject(function ($injector) {
      $rootScope = $injector.get('$rootScope');
      $controller = $injector.get('$controller');
      $timeout = $injector.get('$timeout');
      $stateParams = $injector.get('$stateParams');
      LabelService = $injector.get('LabelService');
      ErrorService = $injector.get('ErrorService');
      Spinner = $injector.get('Spinner');
      $q = $injector.get('$q');
      $scope = $rootScope.$new();
    }));

    beforeEach(function(){
      $stateParams.venueId=9;
    });

    function _startController(ngModel = []) {

      SellerDetailsCtrl = $controller('sellerDetailsCtrl', {
        '$scope': $scope
      }, true);
    }

    it("Should initialize seller details control", function() {
      _startController();
      expect(SellerDetailsCtrl.init).toHaveBeenCalled();
    });

    it("Init should set taxSettings on success", function(done) {
      spyOn(Preoday.VenueTaxSettings, 'get').and.return($q.resolve(settingsMock));
      spyOn(SellerDetailsCtrl, 'init').and.return(true);
      _startController();
      SellerDetailsCtrl.init()
        .then(function(){
          expect(Preoday.VenueTaxSettings.get).toHaveBeenCalledWith($stateParams.venueId);
          expect(SellerDetailsCtrl.taxSettings).toEqual(settingsMock);
          done();
      })
    });

    it("Init should set empty taxSettings on 404 error", function(done) {
      spyOn(Preoday.VenueTaxSettings, 'get').and.return($q.reject({status:404, message:"Not found"}));
      spyOn(SellerDetailsCtrl, 'init').and.return(true);
      _startController();
      SellerDetailsCtrl.init()
        .then(function(){
          expect(Preoday.VenueTaxSettings.get).toHaveBeenCalledWith($stateParams.venueId);
          expect(SellerDetailsCtrl.taxSettings).toEqual(jasmine.any(Preoday.VenueTaxSettings));
          done();
      })
    });

    it("Init should error on any error that's not 404", function(done) {
      spyOn(Preoday.VenueTaxSettings, 'get').and.return($q.reject({status:400, message:"Not found"}));
      spyOn(SellerDetailsCtrl, 'init').and.return(true);
      spyOn(SellerDetailsCtrl, 'showError').and.callThrough();
      _startController();
      SellerDetailsCtrl.init()
        .then(function(){
          expect(Preoday.VenueTaxSettings.get).toHaveBeenCalledWith($stateParams.venueId);
          expect(SellerDetailsCtrl.showError).tohaveBeenCalled();
          done();
      })
    });

});


//tests: when clicking edit should tooggle form editable
//tests: when submit should chooose update or save accordingly
//tests: when submit success show snack
//tests: when submit fails show error snack