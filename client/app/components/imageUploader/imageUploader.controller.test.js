'use strict';

import imageUploader from './';

describe('ImageUploader Controller', function () {

    let
      ImageUploaderCtrl,
      $rootScope,
      $scope,
      $timeout,
      outletLocationMock,
      $controller,
      $compile,
      CroppieService,
      DialogService,
      LabelService,
      Snack,
      UtilsService;

    beforeEach(angular.mock.module(imageUploader));

    beforeEach(angular.mock.inject(function ($injector) {

      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
      $controller = $injector.get('$controller');
      $timeout = $injector.get('$timeout');
      CroppieService = $injector.get('CroppieService');
      DialogService = $injector.get('DialogService');
      LabelService = $injector.get('LabelService');
      UtilsService = $injector.get('UtilsService');
      Snack = $injector.get('Snack');
      $scope = $rootScope.$new();
    }));

    afterEach(function() {

    });

    function _startController(ngModel = []) {

      $scope.ngModel = [];
      ImageUploaderCtrl = $controller('imageUploaderController', {
        '$scope': $scope
      }, true);
      ImageUploaderCtrl.instance.ngModel = ngModel;
      ImageUploaderCtrl = ImageUploaderCtrl();
    }

    it("Should initialize image uploader control", function() {

      _startController();


      // spyOn(contextual, 'showMenu').and.callThrough();
      // spyOn(OutletLocationCtrl.instance, 'buildOutlet').and.callThrough();

      // OutletLocationCtrl.instance.outletLocation = outletLocationMock;
      // OutletLocationCtrl = OutletLocationCtrl();

      // expect(contextual.showMenu).toHaveBeenCalledWith(OutletLocationCtrl.type, outletLocationMock, jasmine.any(Function), jasmine.any(Function));
      // expect(OutletLocationCtrl.type).toBe('outletLocation');
      // expect(OutletLocationCtrl.buildOutlet).not.toHaveBeenCalled();
      // expect(OutletLocationCtrl.outlets.length).toBe(0);
    });

});
