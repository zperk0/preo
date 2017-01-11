'use strict';

describe('Promotion Apply Directive', function () {

    let
      $rootScope,
      $scope,
      isolatedScope,
      $compile,
      element = null;


    beforeEach(angular.mock.module('webapp'));
    beforeEach(angular.mock.inject(function ($injector) {

      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
    }));



    afterEach(function() {

      element = null;
    });

    function _compileDirective() {
      $scope = $rootScope.$new();

      var fooCtrl = {
        add: function() { return 123; }
      };

      $scope.promotion = {
        id:5,
        apply:"ALWAYS",
        code:'123'
      }

      spyOn(fooCtrl, 'add').and.callThrough();

      element = angular.element('<promotion-apply promotion="promotion"></promotion-apply>');
      element.data('$contextualMenuController', fooCtrl);


      $compile(element)($scope);
      $scope.$digest();
      isolatedScope = element.isolateScope(); // access the isolated scope, used to access the functions inside the item scope
    }

    it("Should reset code value when changing type", function() {

      _compileDirective();
      expect(isolatedScope.promotion.id).toBe(5);
      expect(isolatedScope.promotion.apply).toBe('ALWAYS');
      expect(isolatedScope.promotion.code).toBe('123');
      isolatedScope.onTypeChange();
      expect(isolatedScope.promotion.code).toBe("");

    });
});
