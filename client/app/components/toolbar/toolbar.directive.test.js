'use strict';

describe('Toolbar Directive', function () {

    let
      $rootScope,
      $scope,
      $compile,
      $controller,
      toolbarCtrl,
      isolatedScope,
      VenueService,
      element = null;

    beforeEach(angular.mock.module('webapp'));

    beforeEach(angular.mock.inject(function ($injector) {

      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
      $controller = $injector.get('$controller');
      VenueService = $injector.get('VenueService');
    }));

    afterEach(function() {

      element = null;
    });

    function _compileDirective() {

      element = angular.element('<toolbar></toolbar>');

      $scope = $rootScope.$new();

      _startController();

      $compile(element)($scope);
      $scope.$digest();

      isolatedScope = element.isolateScope(); // access the isolated scope, used to access the functions inside the item scope
    }

    function _startController() {

      toolbarCtrl = $controller('toolbarController', {
        '$scope': $scope,
      });

      $scope.vm = toolbarCtrl;
    }

    function _getElementData(nativeElement) {

      return {
        buttons: nativeElement.querySelectorAll('section > .md-button'),
        email: nativeElement.querySelectorAll('section .message .md-button')[0]
      }
    }

    it("Should initalize the toolbar directive", function() {

      _compileDirective();

      var nativeElement = element[0];
      var elemData = _getElementData(nativeElement);

      expect(elemData.buttons.length).toBe(0); //we dont have buttons there anymore
    });
});
