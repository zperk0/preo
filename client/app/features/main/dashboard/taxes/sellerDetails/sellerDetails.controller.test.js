'use strict';

import sellerDetails from './';

describe('SellerDetails Controller', function () {

    let
      $rootScope,
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
    beforeEach(angular.mock.module(sellerDetails));

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

      SellerDetailsCtrl = $controller('sellerDetailsController', {
        '$scope': $scope
      });
    }


    it("Init should set taxSettings on init success", function() {
      spyOn(Preoday.VenueTaxSettings, 'get').and.callFake(function(){return $q.resolve(settingsMock)});
      _startController();
      $rootScope.$digest();
      expect(Preoday.VenueTaxSettings.get).toHaveBeenCalledWith($stateParams.venueId);
      expect(SellerDetailsCtrl.taxSettings).toEqual(settingsMock);
    });

    it("Init should set empty taxSettings on 404 error", function() {
      spyOn(Preoday.VenueTaxSettings, 'get').and.callFake(function(){return $q.reject({status:404, message:"Not found"})});

      _startController();
      $rootScope.$digest();
      expect(Preoday.VenueTaxSettings.get).toHaveBeenCalledWith($stateParams.venueId);
      expect(SellerDetailsCtrl.taxSettings).toEqual(jasmine.any(Preoday.VenueTaxSettings));
    });

    it("Init should error on any error that's not 404", function() {
      spyOn(Preoday.VenueTaxSettings, 'get').and.callFake(function(){return $q.reject({status:400, message:"Not found"})});
      _startController();

      spyOn(SellerDetailsCtrl, 'showError').and.callThrough();

      $rootScope.$digest();
      expect(Preoday.VenueTaxSettings.get).toHaveBeenCalledWith($stateParams.venueId);
      expect(SellerDetailsCtrl.showError).toHaveBeenCalled();
    });

    it("When clicking edit should tooggle form editable", function() {
      spyOn(Preoday.VenueTaxSettings, 'get').and.callFake(function(){return $q.reject({status:400, message:"Not found"})});
      _startController();

      expect(SellerDetailsCtrl.isEdit).toEqual(false);
      SellerDetailsCtrl.toggleEdit();
      expect(SellerDetailsCtrl.isEdit).toEqual(true);
    });

});


//tests: When submit should chooose update if venueId is set
//tests: When submit should chooose save if venueId is not set
//tests: After successful submit tax settings should have a venueId
//tests: After failed Save tax settings should not have a venueId