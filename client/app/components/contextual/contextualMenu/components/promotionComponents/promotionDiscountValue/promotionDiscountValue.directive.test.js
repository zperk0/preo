'use strict';

import components from '../index';

describe('Promotion Discount Value Directive', function () {

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
        amount:123
      }

      spyOn(fooCtrl, 'add').and.callThrough();

      element = angular.element('<promotion-discount-value promotion="promotion"></promotion-discount-value>');
      element.data('$contextualMenuController', fooCtrl);


      $compile(element)($scope);
      $scope.$digest();
      isolatedScope = element.isolateScope(); // access the isolated scope, used to access the functions inside the item scope
    }

    it("Should reset amount value when changing type", function() {

      _compileDirective();
      expect(isolatedScope.promotion.id).toBe(5);
      expect(isolatedScope.promotion.amount).toBe(123);
      isolatedScope.onTypeChange();
      expect(isolatedScope.promotion.amount).toBe("");

    });
});
