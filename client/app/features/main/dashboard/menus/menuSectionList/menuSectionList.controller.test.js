'use strict';

import menuSectionList from './';

describe('menuSectionList Controller', function () {

    let
      MenuSectionListCtrl,
      CardItemListCtrl,
      $rootScope,
      $scope,
      $stateParams,
      ItemService,
      Snack,
      server,
      mockMenu,
      $controller;

    beforeEach(angular.mock.module('webapp'));
    beforeEach(angular.mock.module(menuSectionList));

    beforeEach(angular.mock.inject(function ($injector) {

      $rootScope = $injector.get('$rootScope');
      $controller = $injector.get('$controller');
      $stateParams = $injector.get('$stateParams');
      ItemService = $injector.get('ItemService');
      Snack = $injector.get('Snack');

      $scope = $rootScope.$new();

      $scope.scrollToBottom = () => {};
    }));

    afterEach(function() {

      server.restore();
      CardItemListCtrl = null;
      mockMenu = null;
    });

    function _startController() {

      MenuSectionListCtrl = $controller('menuSectionListController', {
        '$scope': $scope
      }, true);

      server = sinon.fakeServer.create();
    }

    function _startCardItemListController() {

      CardItemListCtrl = $controller('cardItemListController', {
        '$scope': $scope,
      }, true);
    }

    function _mockMenu() {

      mockMenu = new Preoday.Menu({
        id: 1
      });
    }

    it("Should initialize the controller", function() {

      let venueId = 5;

      $stateParams.venueId = venueId;

      _mockMenu();
      _startController();

      MenuSectionListCtrl.instance.menu = mockMenu;
      MenuSectionListCtrl.instance.sections = [];
      MenuSectionListCtrl = MenuSectionListCtrl();

      expect(MenuSectionListCtrl.onSectionMoved).toEqual(jasmine.any(Function));
      expect(MenuSectionListCtrl.showCreateSection).toEqual(jasmine.any(Function));
      expect(MenuSectionListCtrl.deleteSection).toEqual(jasmine.any(Function));
      expect(MenuSectionListCtrl.repeatDone).toEqual(jasmine.any(Function));
      expect(MenuSectionListCtrl.sections.length).toBe(0);
    });

    it("Should create a section", function() {

      let venueId = 5;

      $stateParams.venueId = venueId;

      _mockMenu();
      _startController();

      MenuSectionListCtrl.instance.menu = mockMenu;
      MenuSectionListCtrl.instance.sections = [];
      MenuSectionListCtrl = MenuSectionListCtrl();

      MenuSectionListCtrl.showCreateSection();

      expect(MenuSectionListCtrl.sections.length).toBe(1);
    });

    it("Shouldn't create duplicated section", function() {

      let venueId = 5;

      $stateParams.venueId = venueId;

      _mockMenu();
      _startController();

      MenuSectionListCtrl.instance.menu = mockMenu;
      MenuSectionListCtrl.instance.sections = [];
      MenuSectionListCtrl = MenuSectionListCtrl();

      MenuSectionListCtrl.showCreateSection();
      MenuSectionListCtrl.showCreateSection();

      expect(MenuSectionListCtrl.sections.length).toBe(1);
    });

    it("Should move a section", function() {

      let venueId = 5;

      $stateParams.venueId = venueId;

      _mockMenu();
      _startCardItemListController();
      _startController();

      CardItemListCtrl.instance.collection = [];
      CardItemListCtrl = CardItemListCtrl();

      MenuSectionListCtrl.instance.menu = mockMenu;
      MenuSectionListCtrl.instance.sections = [];
      MenuSectionListCtrl.instance.cardItemList = CardItemListCtrl;
      MenuSectionListCtrl = MenuSectionListCtrl();

      spyOn(CardItemListCtrl, 'onSimpleSort').and.callThrough();

      MenuSectionListCtrl.onSectionMoved();

      expect(CardItemListCtrl.onSimpleSort).toHaveBeenCalled();
    });
});
