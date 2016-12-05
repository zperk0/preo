'use strict';

import menuSection from './';

describe('menuSection Controller', function () {

    let
      MenuSectionCtrl,
      CardItemListCtrl,
      MenuSectionListCtrl,
      $rootScope,
      $scope,
      $stateParams,
      ItemService,
      Snack,
      Spinner,
      server,
      $controller,
      $timeout,
      $q,
      contextual,
      contextualMenu,
      mockSection;

    beforeEach(angular.mock.module('webapp'));
    beforeEach(angular.mock.module(menuSection));

    beforeEach(angular.mock.inject(function ($injector) {

      $rootScope = $injector.get('$rootScope');
      $controller = $injector.get('$controller');
      $stateParams = $injector.get('$stateParams');
      ItemService = $injector.get('ItemService');
      Snack = $injector.get('Snack');
      Spinner = $injector.get('Spinner');
      $timeout = $injector.get('$timeout');
      $q = $injector.get('$q');
      contextual = $injector.get('contextual');
      contextualMenu = $injector.get('contextualMenu');

      $scope = $rootScope.$new();

      $scope.scrollToBottom = () => {};
    }));

    afterEach(function() {

      server.restore();
      CardItemListCtrl = null;
      MenuSectionListCtrl = null;
    });

    function _startController() {

      MenuSectionCtrl = $controller('menuSectionController', {
        '$scope': $scope
      }, true);

      server = sinon.fakeServer.create();
    }

    function _startCardItemListController() {

      CardItemListCtrl = $controller('cardItemListController', {
        '$scope': $scope,
      }, true);
    }

    function _startMenuSectionItemListController() {

      MenuSectionListCtrl = $controller('menuSectionListController', {
        '$scope': $scope,
      }, true);
    }

    function _mockSection() {

      mockSection = new Preoday.Section({
        id: 1,
        name: 'Test item',
        menuId: 1,
        items: [],
        modifiers: []
      });
    }

    it("Should initialize the controller and call the contextual menu", function() {

      spyOn(contextual, 'showMenu').and.callThrough();

      let venueId = 5;

      $stateParams.venueId = venueId;

      _mockSection();
      _startController();

      mockSection.id = null;

      MenuSectionCtrl.instance.section = mockSection;
      MenuSectionCtrl = MenuSectionCtrl();

      expect(MenuSectionCtrl.buildItems).toEqual(jasmine.any(Function));
      expect(MenuSectionCtrl.handleSuccess).toEqual(jasmine.any(Function));
      expect(MenuSectionCtrl.handleCancel).toEqual(jasmine.any(Function));
      expect(MenuSectionCtrl.restoreOriginalValues).toEqual(jasmine.any(Function));
      expect(MenuSectionCtrl.onDelete).toEqual(jasmine.any(Function));
      expect(MenuSectionCtrl.onEdit).toEqual(jasmine.any(Function));
      expect(MenuSectionCtrl.toggleExpanded).toEqual(jasmine.any(Function));
      expect(MenuSectionCtrl.updateItemsPosition).toEqual(jasmine.any(Function));
      expect(MenuSectionCtrl.saveSection).toEqual(jasmine.any(Function));
      expect(MenuSectionCtrl.onNewItemMoved).toEqual(jasmine.any(Function));
      expect(MenuSectionCtrl.isItemDuplicated).toEqual(jasmine.any(Function));
      expect(MenuSectionCtrl.onNewModifierMoved).toEqual(jasmine.any(Function));
      expect(MenuSectionCtrl.type).toEqual('menuSection');
      expect(MenuSectionCtrl.menuItemType).toEqual('menuItem');

      expect(contextual.showMenu).toHaveBeenCalledWith(MenuSectionCtrl.type, mockSection, jasmine.any(Function), jasmine.any(Function));
    });

    it("Should create a section", function(done) {

      spyOn(Preoday.Section, 'save').and.callThrough();
      spyOn(contextualMenu, 'hide').and.callThrough();
      spyOn(Spinner, 'hide').and.callThrough();
      spyOn(Snack, 'show').and.callThrough();

      let venueId = 5;

      $stateParams.venueId = venueId;

      _mockSection();
      _startCardItemListController();
      _startController();

      CardItemListCtrl.instance.collection = [];

      CardItemListCtrl = CardItemListCtrl();

      mockSection.id = null;

      MenuSectionCtrl.instance.section = mockSection;
      MenuSectionCtrl.instance.cardItemList = CardItemListCtrl;
      MenuSectionCtrl = MenuSectionCtrl();

      spyOn(CardItemListCtrl, 'onUpdateItem').and.callThrough();

      expect(CardItemListCtrl.collection.length).toBe(0);

      server.respondWith('POST', '/api/sections', [200, {"Content-Type": "application/json"}, JSON.stringify(mockSection)]);

      MenuSectionCtrl.handleSuccess(mockSection);

      setTimeout(() => {

        $rootScope.$digest();
        server.respond();

        setTimeout(() => {

          $rootScope.$digest();

          expect(Preoday.Section.save).toHaveBeenCalled();
          expect(CardItemListCtrl.onUpdateItem).toHaveBeenCalledWith(mockSection, jasmine.any(Preoday.Section));
          expect(contextualMenu.hide).toHaveBeenCalled();
          expect(Spinner.hide).toHaveBeenCalled();
          expect(Snack.show).toHaveBeenCalled();
          expect(CardItemListCtrl.collection.length).toBe(1);

          done();
        });
      });
    });

    it("Should update a section", function(done) {

      spyOn(contextualMenu, 'hide').and.callThrough();
      spyOn(Spinner, 'show').and.callThrough();
      spyOn(Spinner, 'hide').and.callThrough();
      spyOn(Snack, 'show').and.callThrough();

      let venueId = 5;

      $stateParams.venueId = venueId;

      _mockSection();
      _startCardItemListController();
      _startController();

      // spyOn(mockSection, 'update').callThrough();

      CardItemListCtrl.instance.collection = [mockSection];

      CardItemListCtrl = CardItemListCtrl();

      MenuSectionCtrl.instance.section = mockSection;
      MenuSectionCtrl.instance.cardItemList = CardItemListCtrl;
      MenuSectionCtrl = MenuSectionCtrl();

      spyOn(MenuSectionCtrl, 'saveSection').and.callThrough();

      expect(CardItemListCtrl.collection.length).toBe(1);

      server.respondWith('PUT', '/api/sections/' + mockSection.id, [200, {"Content-Type": "application/json"}, JSON.stringify(mockSection)]);

      MenuSectionCtrl.handleSuccess(mockSection);

      setTimeout(() => {

        $rootScope.$digest();

        expect(Spinner.show).toHaveBeenCalled();
        // expect(mockSection.update).toHaveBeenCalled();

        server.respond();

        setTimeout(() => {

          $rootScope.$digest();

          expect(MenuSectionCtrl.saveSection).toHaveBeenCalled();
          expect(contextualMenu.hide).toHaveBeenCalled();
          expect(Spinner.hide).toHaveBeenCalled();
          expect(Snack.show).toHaveBeenCalled();
          expect(CardItemListCtrl.collection.length).toBe(1);

          done();
        });
      });
    });
});
