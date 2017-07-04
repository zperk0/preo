'use strict';

import menuItem from './';

describe('menuItem Controller', function () {

    let
      MenuItemCtrl,
      CardItemListCtrl,
      MenuSectionItemListCtrl,
      VenueService,
      $rootScope,
      $scope,
      $stateParams,
      ItemService,
      ModifierService,
      Snack,
      Spinner,
      server,
      $controller,
      $timeout,
      $q,
      contextual,
      contextualMenu,
      DialogService,
      mockItem;

    beforeEach(angular.mock.module('webapp'));
    beforeEach(angular.mock.module(menuItem));

    beforeEach(angular.mock.inject(function ($injector) {

      $rootScope = $injector.get('$rootScope');
      $controller = $injector.get('$controller');
      $stateParams = $injector.get('$stateParams');
      ItemService = $injector.get('ItemService');
      ModifierService = $injector.get('ModifierService');
      VenueService = $injector.get('VenueService');
      Snack = $injector.get('Snack');
      Spinner = $injector.get('Spinner');
      $timeout = $injector.get('$timeout');
      $q = $injector.get('$q');
      contextual = $injector.get('contextual');
      contextualMenu = $injector.get('contextualMenu');
      DialogService = $injector.get('DialogService');

      $scope = $rootScope.$new();
      $scope.scrollToBottom = () => {};
      VenueService.currentVenue = {id:5};
    }));

    afterEach(function() {

      server.restore();
      CardItemListCtrl = null;
      MenuSectionItemListCtrl = null;
    });

    function _startController() {

      MenuItemCtrl = $controller('menuItemController', {
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

      MenuSectionItemListCtrl = $controller('menuSectionItemListController', {
        '$scope': $scope,
      }, true);
    }

    function _mockItem() {

      mockItem = new Preoday.Item({
        id: 1,
        name: 'Test item',
        voucherType: Preoday.constants.VoucherType.NONE,
        modifiers: [],
        tags: []
      });
    }

    it("Should initialize the controller and call the contextual menu", function() {

      spyOn(contextual, 'showMenu').and.callThrough();

      let venueId = 5;

      $stateParams.venueId = venueId;

      _mockItem();
      _startController();

      mockItem.id = null;

      MenuItemCtrl.instance.item = mockItem;
      MenuItemCtrl = MenuItemCtrl();

      $timeout.flush();

      expect(MenuItemCtrl.checkMultipleOccurrences).toEqual(jasmine.any(Function));
      expect(MenuItemCtrl.deleteItem).toEqual(jasmine.any(Function));
      expect(MenuItemCtrl.contextualMenuCancel).toEqual(jasmine.any(Function));
      expect(MenuItemCtrl.contextualMenuSuccess).toEqual(jasmine.any(Function));
      expect(MenuItemCtrl.updateItem).toEqual(jasmine.any(Function));
      expect(MenuItemCtrl.createItem).toEqual(jasmine.any(Function));
      expect(MenuItemCtrl.cloneItem).toEqual(jasmine.any(Function));
      expect(MenuItemCtrl.toggleVisibility).toEqual(jasmine.any(Function));
      expect(MenuItemCtrl.onVisibility).toEqual(jasmine.any(Function));
      expect(MenuItemCtrl.onDeleteImage).toEqual(jasmine.any(Function));
      expect(MenuItemCtrl.onEdit).toEqual(jasmine.any(Function));
      expect(MenuItemCtrl.onClone).toEqual(jasmine.any(Function));
      expect(MenuItemCtrl.onNewModifierMoved).toEqual(jasmine.any(Function));
      expect(MenuItemCtrl.onModifierRemoved).toEqual(jasmine.any(Function));
      expect(MenuItemCtrl.type).toEqual('menuItem');

      expect(contextual.showMenu).toHaveBeenCalledWith(MenuItemCtrl.type, mockItem, jasmine.any(Function), jasmine.any(Function), {
        onDeleteImage: jasmine.any(Function),
        tags: jasmine.any(Array)
      });
      expect(MenuItemCtrl.section).toBeUndefined();
      expect(MenuItemCtrl.sectionId).toBeUndefined();
      expect(MenuItemCtrl.modifiers.length).toBe(0);
    });

    it("createItem - Should create an item", function(done) {

      spyOn(ItemService, 'createItem').and.callThrough();
      spyOn(contextualMenu, 'hide').and.callThrough();
      spyOn(Spinner, 'hide').and.callThrough();
      spyOn(Snack, 'show').and.callThrough();

      let venueId = 5;

      $stateParams.venueId = venueId;

      _mockItem();
      _startCardItemListController();
      _startController();

      mockItem.venueId = venueId;
      mockItem.price = 2;

      CardItemListCtrl.instance.collection = [];

      CardItemListCtrl = CardItemListCtrl();

      MenuItemCtrl.instance.item = mockItem;
      MenuItemCtrl.instance.cardItemList = CardItemListCtrl;
      MenuItemCtrl = MenuItemCtrl();

      spyOn(CardItemListCtrl, 'onUpdateItem').and.callThrough();

      expect(CardItemListCtrl.collection.length).toBe(0);

      server.respondWith('POST', '/api/items', [200, {"Content-Type": "application/json"}, JSON.stringify(mockItem)]);

      MenuItemCtrl.createItem();

      setTimeout(() => {

        $rootScope.$digest();
        server.respond();

        setTimeout(() => {

          $rootScope.$digest();

          expect(ItemService.createItem).toHaveBeenCalledWith(MenuItemCtrl.item, MenuItemCtrl.sectionId);
          expect(CardItemListCtrl.onUpdateItem).toHaveBeenCalledWith(mockItem, jasmine.any(Preoday.Item));
          expect(contextualMenu.hide).toHaveBeenCalled();
          expect(Spinner.hide).toHaveBeenCalled();
          expect(Snack.show).toHaveBeenCalled();
          expect(CardItemListCtrl.collection.length).toBe(1);
          expect(mockItem.price).toBe(2);

          done();
        });
      });
    });

    it("Should update an item for all menus", function(done) {

      spyOn(ItemService, 'updateItem').and.callThrough();
      spyOn(contextualMenu, 'hide').and.callThrough();
      spyOn(Spinner, 'show').and.callThrough();
      spyOn(Spinner, 'hide').and.callThrough();
      spyOn(Snack, 'show').and.callThrough();

      let venueId = 5;

      $stateParams.venueId = venueId;

      _mockItem();
      _startCardItemListController();
      _startController();

      mockItem.venueId = venueId;
      mockItem.images = [];

      ItemService.data.items = [mockItem];

      CardItemListCtrl.instance.collection = [mockItem];

      CardItemListCtrl = CardItemListCtrl();

      MenuItemCtrl.instance.item = mockItem;
      MenuItemCtrl.instance.cardItemList = CardItemListCtrl;
      MenuItemCtrl = MenuItemCtrl();

      spyOn(CardItemListCtrl, 'onItemUpdated').and.callThrough();

      expect(CardItemListCtrl.collection.length).toBe(1);

      server.respondWith('PUT', '/api/items/' + mockItem.id, [200, {"Content-Type": "application/json"}, JSON.stringify(mockItem)]);

      MenuItemCtrl.updateItem(mockItem);

      setTimeout(() => {

        $rootScope.$digest();

        expect(Spinner.show).toHaveBeenCalled();
        expect(ItemService.updateItem).toHaveBeenCalledWith(jasmine.any(Preoday.Item), false);

        server.respond();

        setTimeout(() => {

          $rootScope.$digest();

          expect(CardItemListCtrl.onItemUpdated).toHaveBeenCalledWith(mockItem);
          expect(contextualMenu.hide).toHaveBeenCalled();
          expect(Spinner.hide).toHaveBeenCalled();
          expect(Snack.show).toHaveBeenCalled();
          expect(CardItemListCtrl.collection.length).toBe(1);

          done();
        });
      });
    });

    it("Should update an item for a single menu", function(done) {

      spyOn(ItemService, 'checkMultipleOccurrences').and.returnValue($q.resolve('single'));
      spyOn(ItemService, 'doSingleEdit').and.callThrough();
      spyOn(ItemService, 'cloneItem').and.callThrough();
      spyOn(ItemService, 'removeFromSection').and.callThrough();
      spyOn(contextualMenu, 'hide').and.callThrough();
      spyOn(Spinner, 'show').and.callThrough();
      spyOn(Spinner, 'hide').and.callThrough();
      spyOn(Snack, 'show').and.callThrough();
      spyOn(Preoday.Section, 'removeItems').and.callThrough();

      let venueId = 5;
      let mockSection = new Preoday.Section({
        id: 1,
        items: []
      });

      $stateParams.venueId = venueId;

      _mockItem();
      _startCardItemListController();
      _startMenuSectionItemListController();
      _startController();

      mockItem.sectionId = mockSection.id;
      mockItem.venueId = venueId;
      mockItem.images = [];
      mockItem.position = 0;

      ItemService.data.items = [mockItem];

      CardItemListCtrl.instance.collection = [mockItem];
      MenuSectionItemListCtrl.instance.items = [mockItem];
      MenuSectionItemListCtrl.instance.section = [mockSection];

      CardItemListCtrl = CardItemListCtrl();
      MenuSectionItemListCtrl = MenuSectionItemListCtrl();

      MenuItemCtrl.instance.section = mockSection;
      MenuItemCtrl.instance.item = mockItem;
      MenuItemCtrl.instance.cardItemList = CardItemListCtrl;
      MenuItemCtrl.instance.menuSectionItemList = MenuSectionItemListCtrl;
      MenuItemCtrl = MenuItemCtrl();

      spyOn(CardItemListCtrl, 'onUpdateItem').and.callThrough();
      spyOn(MenuSectionItemListCtrl, 'getPosition').and.callThrough();

      expect(CardItemListCtrl.collection.length).toBe(1);
      expect(MenuItemCtrl.sectionId).toBe(mockSection.id);

      server.respondWith('POST', '/api/sections/' + mockSection.id + '/items', [200, {"Content-Type": "application/json"}, JSON.stringify(mockItem)]);

      MenuItemCtrl.updateItem(mockItem);

      setTimeout(() => {

        $rootScope.$digest();

        expect(MenuSectionItemListCtrl.getPosition).toHaveBeenCalledWith(mockItem);
        expect(Spinner.show).toHaveBeenCalled();
        expect(ItemService.doSingleEdit).toHaveBeenCalledWith(jasmine.any(Preoday.Item), mockSection.id, mockItem.position);
        expect(ItemService.cloneItem).toHaveBeenCalledWith(jasmine.any(Preoday.Item), mockSection.id, mockItem.position);

        server.respond();

        setTimeout(() => {

          $rootScope.$digest();

          expect(CardItemListCtrl.onUpdateItem).toHaveBeenCalledWith(mockItem, jasmine.any(Preoday.Item));
          expect(contextualMenu.hide).toHaveBeenCalled();
          expect(Spinner.hide).toHaveBeenCalled();
          expect(Snack.show).toHaveBeenCalled();
          expect(Preoday.Section.removeItems).toHaveBeenCalled();
          expect(CardItemListCtrl.collection.length).toBe(1);

          done();
        });
      });
    });

    it("Should add a modifier to an item", function(done) {

      spyOn(ItemService, 'checkMultipleOccurrences').and.returnValue($q.resolve('single'));
      spyOn(ItemService, 'addModifiersToItem').and.callThrough();
      spyOn(ModifierService, 'addCustomModifierToParent').and.callThrough();
      spyOn(ModifierService, 'isModifiersDuplicated').and.callThrough();
      spyOn(contextualMenu, 'hide').and.callThrough();
      spyOn(Spinner, 'show').and.callThrough();
      spyOn(Spinner, 'hide').and.callThrough();
      spyOn(Snack, 'show').and.callThrough();
      spyOn(Snack, 'showError').and.callThrough();

      let venueId = 5;

      $stateParams.venueId = venueId;

      _mockItem();
      _startCardItemListController();
      _startMenuSectionItemListController();
      _startController();

      mockItem.venueId = venueId;
      mockItem.images = [];
      mockItem.position = 0;

      let $modifiers = [new Preoday.Modifier({
        id: 1,
        name: 'test',
        venueId: venueId,
        items: []
      })];
      let mockSection = new Preoday.Section();

      ItemService.data.items = [mockItem];
      ModifierService.data.modifiers = [$modifiers[0]];

      CardItemListCtrl.instance.collection = [mockItem];
      MenuSectionItemListCtrl.instance.items = [mockItem];
      MenuSectionItemListCtrl.instance.section = [mockSection];

      CardItemListCtrl = CardItemListCtrl();
      MenuSectionItemListCtrl = MenuSectionItemListCtrl();

      MenuItemCtrl.instance.item = mockItem;
      MenuItemCtrl.instance.cardItemList = CardItemListCtrl;
      MenuItemCtrl.instance.menuSectionItemList = MenuSectionItemListCtrl;
      MenuItemCtrl = MenuItemCtrl();

      spyOn(MenuItemCtrl, 'showSameSectionModifierDialog');

      expect(CardItemListCtrl.collection.length).toBe(1);

      server.respondWith('POST', '/api/modifiers', [200, {"Content-Type": "application/json"}, JSON.stringify($modifiers[0])]);

      expect(MenuItemCtrl.modifiers.length).toBe(0);
      expect(MenuItemCtrl.item.modifiers.length).toBe(0);

      MenuItemCtrl.onNewModifierMoved($modifiers);

      setTimeout(() => {

        $rootScope.$digest();

        expect(Spinner.show).toHaveBeenCalled();

        server.respond();

        setTimeout(() => {

          $rootScope.$digest();

          setTimeout(() => {

            $rootScope.$digest();

            expect(MenuItemCtrl.modifiers.length).toBe(1);
            expect(MenuItemCtrl.item.modifiers.length).toBe(1);

            expect(MenuItemCtrl.modifiers[0].id).toBe($modifiers[0].id);
            expect(MenuItemCtrl.item.modifiers[0].id).toBe($modifiers[0].id);

            expect(Spinner.hide).toHaveBeenCalled();
            expect(Snack.show).toHaveBeenCalled();
            expect(Snack.showError).not.toHaveBeenCalled();
            expect(ModifierService.isModifiersDuplicated).toHaveBeenCalled();
            expect(ModifierService.addCustomModifierToParent).toHaveBeenCalled();
            expect(ItemService.addModifiersToItem).toHaveBeenCalledWith(mockItem.id, [jasmine.objectContaining({
              id: $modifiers[0].id
            })]);

            done();
          })
        });
      });
    });

    it("Should add an existing section's modifier to an item", function(done) {

      spyOn(ItemService, 'checkMultipleOccurrences').and.returnValue($q.resolve('all'));
      spyOn(ItemService, 'addModifiersToItem').and.callThrough();
      spyOn(ModifierService, 'addCustomModifierToParent').and.callThrough();
      spyOn(ModifierService, 'isModifiersDuplicated').and.callThrough();
      spyOn(contextualMenu, 'hide').and.callThrough();
      spyOn(Spinner, 'show').and.callThrough();
      spyOn(Spinner, 'hide').and.callThrough();
      spyOn(Snack, 'show').and.callThrough();
      spyOn(DialogService, 'show').and.returnValue($q.resolve());

      let venueId = 5;

      $stateParams.venueId = venueId;

      _mockItem();
      _startCardItemListController();
      _startMenuSectionItemListController();
      _startController();

      mockItem.venueId = venueId;
      mockItem.images = [];
      mockItem.position = 0;

      let $modifiers = [new Preoday.Modifier({
        id: 1,
        name: 'test',
        venueId: venueId,
        items: []
      })];
      let mockSection = new Preoday.Section({
        id: 1,
        modifiers: $modifiers,
        items: []
      });

      ItemService.data.items = [mockItem];
      ModifierService.data.modifiers = [$modifiers[0]];

      CardItemListCtrl.instance.collection = [mockItem];
      MenuSectionItemListCtrl.instance.items = [mockItem];
      MenuSectionItemListCtrl.instance.section = [mockSection];

      CardItemListCtrl = CardItemListCtrl();
      MenuSectionItemListCtrl = MenuSectionItemListCtrl();

      MenuItemCtrl.instance.item = mockItem;
      MenuItemCtrl.instance.section = mockSection;
      MenuItemCtrl.instance.cardItemList = CardItemListCtrl;
      MenuItemCtrl.instance.menuSectionItemList = MenuSectionItemListCtrl;
      MenuItemCtrl = MenuItemCtrl();

      spyOn(MenuItemCtrl, 'showSameSectionModifierDialog').and.callThrough();

      expect(CardItemListCtrl.collection.length).toBe(1);

      server.respondWith('POST', '/api/modifiers', [200, {"Content-Type": "application/json"}, JSON.stringify($modifiers[0])]);

      expect(MenuItemCtrl.modifiers.length).toBe(0);
      expect(MenuItemCtrl.item.modifiers.length).toBe(0);

      MenuItemCtrl.onNewModifierMoved($modifiers);

      setTimeout(() => {

        $rootScope.$digest();

        setTimeout(() => {

          $rootScope.$digest();

          expect(Spinner.show).toHaveBeenCalled();

          server.respond();

          setTimeout(() => {

            $rootScope.$digest();

            setTimeout(() => {

              $rootScope.$digest();

              expect(MenuItemCtrl.modifiers.length).toBe(1);
              expect(MenuItemCtrl.item.modifiers.length).toBe(1);

              expect(MenuItemCtrl.modifiers[0].id).toBe($modifiers[0].id);
              expect(MenuItemCtrl.item.modifiers[0].id).toBe($modifiers[0].id);

              expect(Spinner.hide).toHaveBeenCalled();
              expect(Snack.show).toHaveBeenCalled();
              expect(MenuItemCtrl.showSameSectionModifierDialog).toHaveBeenCalled();
              expect(ModifierService.isModifiersDuplicated).toHaveBeenCalled();
              expect(ModifierService.addCustomModifierToParent).toHaveBeenCalled();
              expect(ItemService.addModifiersToItem).toHaveBeenCalledWith(mockItem.id, [jasmine.objectContaining({
                id: $modifiers[0].id
              })]);

              done();
            })
          });
        })
      });
    });

    it("Should cancel move modifier to an item", function(done) {

      spyOn(ItemService, 'checkMultipleOccurrences').and.returnValue($q.resolve('all'));
      spyOn(ItemService, 'addModifiersToItem').and.callThrough();
      spyOn(ModifierService, 'addCustomModifierToParent').and.callThrough();
      spyOn(ModifierService, 'isModifiersDuplicated').and.callThrough();
      spyOn(contextualMenu, 'hide').and.callThrough();
      spyOn(Spinner, 'show').and.callThrough();
      spyOn(Spinner, 'hide').and.callThrough();
      spyOn(Snack, 'show').and.callThrough();
      spyOn(DialogService, 'show').and.returnValue($q.reject());

      let venueId = 5;

      $stateParams.venueId = venueId;

      _mockItem();
      _startCardItemListController();
      _startMenuSectionItemListController();
      _startController();

      mockItem.venueId = venueId;
      mockItem.images = [];
      mockItem.position = 0;

      let $modifiers = [new Preoday.Modifier({
        id: 1,
        name: 'test',
        venueId: venueId,
        items: []
      })];
      let mockSection = new Preoday.Section({
        id: 1,
        modifiers: $modifiers,
        items: []
      });

      ItemService.data.items = [mockItem];
      ModifierService.data.modifiers = [$modifiers[0]];

      CardItemListCtrl.instance.collection = [mockItem];
      MenuSectionItemListCtrl.instance.items = [mockItem];
      MenuSectionItemListCtrl.instance.section = [mockSection];

      CardItemListCtrl = CardItemListCtrl();
      MenuSectionItemListCtrl = MenuSectionItemListCtrl();

      MenuItemCtrl.instance.item = mockItem;
      MenuItemCtrl.instance.section = mockSection;
      MenuItemCtrl.instance.cardItemList = CardItemListCtrl;
      MenuItemCtrl.instance.menuSectionItemList = MenuSectionItemListCtrl;
      MenuItemCtrl = MenuItemCtrl();

      spyOn(MenuItemCtrl, 'showSameSectionModifierDialog').and.callThrough();

      expect(CardItemListCtrl.collection.length).toBe(1);

      expect(MenuItemCtrl.modifiers.length).toBe(0);
      expect(MenuItemCtrl.item.modifiers.length).toBe(0);

      MenuItemCtrl.onNewModifierMoved($modifiers);

      setTimeout(() => {

        $rootScope.$digest();

        setTimeout(() => {

          $rootScope.$digest();

          setTimeout(() => {

            $rootScope.$digest();

            expect(MenuItemCtrl.modifiers.length).toBe(0);
            expect(MenuItemCtrl.item.modifiers.length).toBe(0);

            expect(Spinner.hide).not.toHaveBeenCalled();
            expect(Snack.show).not.toHaveBeenCalled();
            expect(MenuItemCtrl.showSameSectionModifierDialog).toHaveBeenCalled();
            expect(ModifierService.isModifiersDuplicated).toHaveBeenCalled();
            expect(ModifierService.addCustomModifierToParent).not.toHaveBeenCalled();
            expect(ItemService.addModifiersToItem).not.toHaveBeenCalled();

            done();
          })
        });
      });
    });

    it("Should show error message when add a modifier to a voucher", function(done) {

      spyOn(ItemService, 'checkMultipleOccurrences').and.returnValue($q.resolve('single'));
      spyOn(ItemService, 'addModifiersToItem').and.callThrough();
      spyOn(ModifierService, 'addCustomModifierToParent').and.callThrough();
      spyOn(ModifierService, 'isModifiersDuplicated').and.callThrough();
      spyOn(contextualMenu, 'hide').and.callThrough();
      spyOn(Spinner, 'show').and.callThrough();
      spyOn(Spinner, 'hide').and.callThrough();
      spyOn(Snack, 'show').and.callThrough();
      spyOn(Snack, 'showError').and.callThrough();

      let venueId = 5;

      $stateParams.venueId = venueId;

      _mockItem();
      _startCardItemListController();
      _startMenuSectionItemListController();
      _startController();

      mockItem.voucherType = Preoday.constants.VoucherType.ALL;
      mockItem.venueId = venueId;
      mockItem.images = [];
      mockItem.position = 0;

      let $modifiers = [new Preoday.Modifier({
        id: 1,
        name: 'test',
        venueId: venueId,
        items: []
      })];
      let mockSection = new Preoday.Section();

      ItemService.data.items = [mockItem];
      ModifierService.data.modifiers = [$modifiers[0]];

      CardItemListCtrl.instance.collection = [mockItem];
      MenuSectionItemListCtrl.instance.items = [mockItem];
      MenuSectionItemListCtrl.instance.section = [mockSection];

      CardItemListCtrl = CardItemListCtrl();
      MenuSectionItemListCtrl = MenuSectionItemListCtrl();

      MenuItemCtrl.instance.item = mockItem;
      MenuItemCtrl.instance.cardItemList = CardItemListCtrl;
      MenuItemCtrl.instance.menuSectionItemList = MenuSectionItemListCtrl;
      MenuItemCtrl = MenuItemCtrl();

      expect(CardItemListCtrl.collection.length).toBe(1);

      expect(MenuItemCtrl.modifiers.length).toBe(0);
      expect(MenuItemCtrl.item.modifiers.length).toBe(0);

      MenuItemCtrl.onNewModifierMoved($modifiers);

      expect(MenuItemCtrl.modifiers.length).toBe(0);
      expect(MenuItemCtrl.item.modifiers.length).toBe(0);

      expect(Spinner.hide).not.toHaveBeenCalled();
      expect(Snack.show).not.toHaveBeenCalled();
      expect(Snack.showError).toHaveBeenCalledWith('You cannot add a modifier to a voucher');
      expect(ModifierService.isModifiersDuplicated).toHaveBeenCalled();
      expect(ModifierService.addCustomModifierToParent).not.toHaveBeenCalled();
      expect(ItemService.addModifiersToItem).not.toHaveBeenCalled();

      done();
    });

    it("Should remove a modifier from an item", function(done) {

      let venueId = 5;

      $stateParams.venueId = venueId;

      _mockItem();
      _startCardItemListController();
      _startMenuSectionItemListController();
      _startController();

      let modifier = new Preoday.Modifier({
        id: 1,
        name: 'test',
        venueId: venueId,
        items: []
      });

      mockItem.venueId = venueId;
      mockItem.images = [];
      mockItem.position = 0;
      mockItem.modifiers = [modifier];

      let mockSection = new Preoday.Section();

      ItemService.data.items = [mockItem];
      ModifierService.data.modifiers = [modifier];

      CardItemListCtrl.instance.collection = [mockItem];
      MenuSectionItemListCtrl.instance.items = [mockItem];
      MenuSectionItemListCtrl.instance.section = [mockSection];

      CardItemListCtrl = CardItemListCtrl();
      MenuSectionItemListCtrl = MenuSectionItemListCtrl();

      MenuItemCtrl.instance.item = mockItem;
      MenuItemCtrl.instance.cardItemList = CardItemListCtrl;
      MenuItemCtrl.instance.menuSectionItemList = MenuSectionItemListCtrl;
      MenuItemCtrl = MenuItemCtrl();

      expect(CardItemListCtrl.collection.length).toBe(1);

      server.respondWith('DELETE', '/api/modifiers/' + mockItem.modifiers[0].id, [200, {"Content-Type": "application/json"}, JSON.stringify({})]);

      expect(MenuItemCtrl.modifiers.length).toBe(1);
      expect(MenuItemCtrl.item.modifiers.length).toBe(1);

      MenuItemCtrl.onModifierRemoved(mockItem.modifiers[0]);

      setTimeout(() => {

        $rootScope.$digest();

        server.respond();

        setTimeout(() => {

          $rootScope.$digest();

          expect(MenuItemCtrl.modifiers.length).toBe(0);
          expect(MenuItemCtrl.item.modifiers.length).toBe(0);

          done();
        });
      });
    });

    it("createItem - Create create an item with modifiers", function(done) {

      spyOn(ItemService, 'createItem').and.callThrough();
      spyOn(contextualMenu, 'hide').and.callThrough();
      spyOn(Spinner, 'hide').and.callThrough();
      spyOn(Snack, 'show').and.callThrough();

      let venueId = 5;

      $stateParams.venueId = venueId;

      _mockItem();
      _startCardItemListController();
      _startController();

      mockItem.venueId = venueId;
      mockItem.price = 2;
      mockItem.$size = {
        $isMultiple: true,
        items: [{
          visible: 1,
          position: 1
        }]
      };

      CardItemListCtrl.instance.collection = [];

      CardItemListCtrl = CardItemListCtrl();

      MenuItemCtrl.instance.item = mockItem;
      MenuItemCtrl.instance.cardItemList = CardItemListCtrl;
      MenuItemCtrl = MenuItemCtrl();

      spyOn(CardItemListCtrl, 'onUpdateItem').and.callThrough();

      expect(CardItemListCtrl.collection.length).toBe(0);

      server.respondWith('POST', '/api/items', [200, {"Content-Type": "application/json"}, JSON.stringify(mockItem)]);

      MenuItemCtrl.createItem();

      setTimeout(() => {

        $rootScope.$digest();
        server.respond();

        setTimeout(() => {

          $rootScope.$digest();

          expect(ItemService.createItem).toHaveBeenCalledWith(MenuItemCtrl.item, MenuItemCtrl.sectionId);
          expect(CardItemListCtrl.onUpdateItem).toHaveBeenCalledWith(mockItem, jasmine.any(Preoday.Item));
          expect(contextualMenu.hide).toHaveBeenCalled();
          expect(Spinner.hide).toHaveBeenCalled();
          expect(Snack.show).toHaveBeenCalled();
          expect(CardItemListCtrl.collection.length).toBe(1);
          expect(mockItem.price).toBe(0);

          done();
        });
      });
    });

    it("updateItem - Should update an item to be multi size", function(done) {

      spyOn(ItemService, 'updateItem').and.callThrough();
      spyOn(contextualMenu, 'hide').and.callThrough();
      spyOn(Spinner, 'show').and.callThrough();
      spyOn(Spinner, 'hide').and.callThrough();
      spyOn(Snack, 'show').and.callThrough();

      let venueId = 5;

      $stateParams.venueId = venueId;

      _mockItem();
      _startCardItemListController();
      _startController();

      mockItem.venueId = venueId;
      mockItem.images = [];
      mockItem.price = 2;
      mockItem.$size = {
        $isMultiple: true,
        items: [{
          visible: 1,
          position: 1
        }]
      };


      ItemService.data.items = [mockItem];

      CardItemListCtrl.instance.collection = [mockItem];

      CardItemListCtrl = CardItemListCtrl();

      MenuItemCtrl.instance.item = mockItem;
      MenuItemCtrl.instance.cardItemList = CardItemListCtrl;
      MenuItemCtrl = MenuItemCtrl();

      spyOn(CardItemListCtrl, 'onItemUpdated').and.callThrough();
      spyOn(ItemService, '_saveItemSize').and.returnValue(mockItem);

      expect(CardItemListCtrl.collection.length).toBe(1);

      server.respondWith('PUT', '/api/items/' + mockItem.id, [200, {"Content-Type": "application/json"}, JSON.stringify(mockItem)]);

      MenuItemCtrl.updateItem(mockItem);

      setTimeout(() => {

        $rootScope.$digest();

        expect(Spinner.show).toHaveBeenCalled();
        expect(ItemService.updateItem).toHaveBeenCalledWith(jasmine.any(Preoday.Item), false);

        server.respond();

        setTimeout(() => {

          $rootScope.$digest();

          expect(CardItemListCtrl.onItemUpdated).toHaveBeenCalledWith(mockItem);
          expect(contextualMenu.hide).toHaveBeenCalled();
          expect(Spinner.hide).toHaveBeenCalled();
          expect(Snack.show).toHaveBeenCalled();
          expect(CardItemListCtrl.collection.length).toBe(1);
          expect(mockItem.price).toBe(0);

          done();
        });
      });
    });

  it("Should get the right fromPrice when item and section has modifiers", function() {

    let venueId = 5;

    $stateParams.venueId = venueId;

    _mockItem();
    _startController();

    let modifier = new Preoday.Modifier({
      id: 1,
      name: 'test',
      venueId: venueId,
      items: [{
        price: Math.random()
      }]
    });

    let mockSection = new Preoday.Section({
      id: 1,
      items: [],
      modifiers: [modifier]
    });

    mockItem.venueId = venueId;
    mockItem.sectionId = mockSection.id;
    mockItem.images = [];
    mockItem.position = 0;
    mockItem.modifiers = [modifier];
    mockItem.price = Math.random();

    ModifierService.data.modifiers = [modifier];

    MenuItemCtrl.instance.item = mockItem;
    MenuItemCtrl.instance.section = mockSection;
    MenuItemCtrl = MenuItemCtrl();

    expect(MenuItemCtrl.item.modifiers.length).toBe(1);
    expect(MenuItemCtrl.section.modifiers.length).toBe(1);
    expect(MenuItemCtrl.item.hasFromPrice()).toBe(true);
    expect(MenuItemCtrl.section.hasFromPrice()).toBe(true);
    expect(MenuItemCtrl.getFromPrice()).toEqual(MenuItemCtrl.item.getFromPrice() + MenuItemCtrl.section.getFromPrice());
  });

  it("Should get the right fromPrice when only section has modifiers", function() {

    let venueId = 5;

    $stateParams.venueId = venueId;

    _mockItem();
    _startController();

    let modifier = new Preoday.Modifier({
      id: 1,
      name: 'test',
      venueId: venueId,
      items: [{
        price: Math.random()
      }]
    });

    let mockSection = new Preoday.Section({
      id: 1,
      items: [],
      modifiers: [modifier]
    });

    mockItem.venueId = venueId;
    mockItem.sectionId = mockSection.id;
    mockItem.images = [];
    mockItem.position = 0;
    mockItem.modifiers = [];
    mockItem.price = Math.random();

    ModifierService.data.modifiers = [modifier];

    MenuItemCtrl.instance.item = mockItem;
    MenuItemCtrl.instance.section = mockSection;
    MenuItemCtrl = MenuItemCtrl();

    expect(MenuItemCtrl.item.modifiers.length).toBe(0);
    expect(MenuItemCtrl.section.modifiers.length).toBe(1);
    expect(MenuItemCtrl.item.hasFromPrice()).toBeUndefined();
    expect(MenuItemCtrl.section.hasFromPrice()).toBe(true);
    expect(MenuItemCtrl.getFromPrice()).toEqual(MenuItemCtrl.section.getFromPrice() + MenuItemCtrl.item.price);
  });

  it("Should get the right fromPrice when only item has modifiers", function() {

    let venueId = 5;

    $stateParams.venueId = venueId;

    _mockItem();
    _startController();

    let modifier = new Preoday.Modifier({
      id: 1,
      name: 'test',
      venueId: venueId,
      items: [{
        price: Math.random()
      }]
    });

    let mockSection = new Preoday.Section({
      id: 1,
      items: [],
      modifiers: []
    });

    mockItem.venueId = venueId;
    mockItem.sectionId = mockSection.id;
    mockItem.images = [];
    mockItem.position = 0;
    mockItem.modifiers = [modifier];
    mockItem.price = Math.random();

    ModifierService.data.modifiers = [modifier];

    MenuItemCtrl.instance.item = mockItem;
    MenuItemCtrl.instance.section = mockSection;
    MenuItemCtrl = MenuItemCtrl();

    expect(MenuItemCtrl.item.modifiers.length).toBe(1);
    expect(MenuItemCtrl.section.modifiers.length).toBe(0);
    expect(MenuItemCtrl.section.hasFromPrice()).toBeUndefined();
    expect(MenuItemCtrl.getFromPrice()).toEqual(MenuItemCtrl.item.getFromPrice());
  });

  it("Should show tag action icon", function() {

    let venueId = 5;

    $stateParams.venueId = venueId;

    _mockItem();
    _startController();

    let mockTagAction = new Preoday.CustomTagAction({
      id: 1,
      name: 'Tag Action'
    });

    mockItem.id = null;
    mockItem.tagActions = [mockTagAction];

    MenuItemCtrl.instance.item = mockItem;
    MenuItemCtrl = MenuItemCtrl();

    $timeout.flush();

    expect(MenuItemCtrl.section).toBeUndefined();
    expect(MenuItemCtrl.sectionId).toBeUndefined();
  });

  it("Shouldn't show tag action icon", function() {

    let venueId = 5;

    $stateParams.venueId = venueId;

    _mockItem();
    _startController();

    mockItem.id = null;
    mockItem.tagActions = [];

    MenuItemCtrl.instance.item = mockItem;
    MenuItemCtrl = MenuItemCtrl();

    $timeout.flush();

    expect(MenuItemCtrl.section).toBeUndefined();
    expect(MenuItemCtrl.sectionId).toBeUndefined();
    expect(MenuItemCtrl.showActionIcon()).toBe(false);
  });
});
