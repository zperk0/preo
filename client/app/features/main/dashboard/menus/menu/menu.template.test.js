'use strict';

import menu from './';

describe('Menu Template', function () {

    let
      MenuCtrl,
      $rootScope,
      $scope,
      $compile,
      $controller,
      _template = null;

    beforeEach(angular.mock.module(menu));

    // beforeEach(angular.mock.module(function ($provide) {
    //     $provide.constant('initialTodos', []);
    // }));

    beforeEach(angular.mock.inject(function ($injector) {

      $controller = $injector.get('$controller');
      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
      $scope = $rootScope.$new();

      _template = require('./menu.tpl.html');
    }));

    afterEach(function() {

      _template = null;
    });

    function _startController() {

      MenuCtrl = $controller('menuController', {
        '$scope': $scope,
      });

      $scope.vm = MenuCtrl;
    }

    function getMockedMenu() {

      return new Preoday.Menu.constructor({
        name: 'Test menu',
        sections: [{
          id: 1,
          name: 'Test section',
          items: []
        }]
      });
    }

    function _getElementData(nativeElement) {

      let sectionList = nativeElement.querySelectorAll('.menu-section-list');

      return {
        name: nativeElement.querySelectorAll('.menu-name')[0].innerText,
        sectionList: sectionList.length ? sectionList[0] : undefined
      };
    }

    it("Should initalize template with a menu", function() {

      _startController();

      MenuCtrl.menu = getMockedMenu();

      var element = $compile(_template)($scope);

      $scope.$digest();

      var elemData = _getElementData(element[0]);

      expect(elemData.name).toEqual(MenuCtrl.menu.name);
      expect(elemData.sectionList).toBeDefined();
      expect(elemData.sectionList.querySelectorAll('.menu-section').length).toBe(MenuCtrl.menu.sections.length);
    });
});
