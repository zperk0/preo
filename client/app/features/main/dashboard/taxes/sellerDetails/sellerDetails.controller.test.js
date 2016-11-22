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

    var settingsMock = new Preoday.VenueTaxSettings({
      venueId:1,
      taxId:"123456"
    });

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


    // it("Should select between save or update if venueId is or isn't set", function() {
    //   spyOn(Preoday.VenueTaxSettings, 'get').and.callFake(function(){return $q.resolve(settingsMock)});
    //   _startController();

    //   $rootScope.$digest();
    //   expect(SellerDetailsCtrl.taxSettings).toEqual(settingsMock);
    //   var saveOrUpdate = SellerDetailsCtrl.saveOrUpdate();
    //   expect(saveOrUpdate.name).toEqual(SellerDetailsCtrl.updateSettings.name)
    //   delete SellerDetailsCtrl.taxSettings.venueId;
    //   saveOrUpdate = SellerDetailsCtrl.saveOrUpdate();
    //   expect(saveOrUpdate.name).toEqual(SellerDetailsCtrl.saveNewSettings.name)
    // });

    it("Should extend when trying to save to prevent triggering an update when it actually shoud be a save", function() {
      spyOn(Preoday.VenueTaxSettings, 'get').and.callFake(function(){return $q.resolve(settingsMock)});
      spyOn(Preoday.VenueTaxSettings, 'save').and.callFake(function(){return $q.resolve(settingsMock)});
      spyOn(angular,'extend').and.callThrough();
      _startController();

      $rootScope.$digest();
      expect(SellerDetailsCtrl.taxSettings).toEqual(settingsMock);
      delete SellerDetailsCtrl.taxSettings.venueId;
      SellerDetailsCtrl.saveNewSettings();
      expect(angular.extend).toHaveBeenCalled();

    });


});