'use strict';

import modifierModule from './';

describe('modifier item Controller', function () {

    let
      ModifierCtrl,
      CardItemListCtrl,
      VenueService,
      $rootScope,
      $scope,
      $stateParams,
      ModifierService,
      Snack,
      Spinner,
      server,
      $controller,
      $timeout,
      $q,
      contextual,
      contextualMenu,
      mockModifier;

    beforeEach(angular.mock.module('webapp'));
    beforeEach(angular.mock.module(modifierModule));

    beforeEach(angular.mock.inject(function ($injector) {

      $rootScope = $injector.get('$rootScope');
      $controller = $injector.get('$controller');
      $stateParams = $injector.get('$stateParams');
      ModifierService = $injector.get('ModifierService');
      VenueService = $injector.get('VenueService');
      Snack = $injector.get('Snack');
      Spinner = $injector.get('Spinner');
      $timeout = $injector.get('$timeout');
      $q = $injector.get('$q');
      contextual = $injector.get('contextual');
      contextualMenu = $injector.get('contextualMenu');

      $scope = $rootScope.$new();
      $scope.scrollToBottom = () => {};
      VenueService.currentVenue = {id:5};
    }));

    afterEach(function() {

      server.restore();
      CardItemListCtrl = null;
    });

    function _startController() {

      ModifierCtrl = $controller('modifierItemController', {
        '$scope': $scope
      }, true);

      server = sinon.fakeServer.create();
    }

    function _startCardItemListController() {

      CardItemListCtrl = $controller('cardItemListController', {
        '$scope': $scope,
      }, true);
    }

    function _mockModifier() {

      mockModifier = new Preoday.Modifier({
        id: 1,
        name: 'Test modifier',
        modifiers: [],
        items: [],
        tags: []
      });
    }

    it("Should add a modifier to a modifier", function(done) {

      spyOn(ModifierService, 'addCustomModifierToParent').and.callThrough();
      spyOn(ModifierService, 'canAddModifiers').and.callThrough();
      spyOn(ModifierService, 'isModifiersDuplicated').and.callThrough();
      spyOn(contextualMenu, 'hide').and.callThrough();
      spyOn(Spinner, 'show').and.callThrough();
      spyOn(Spinner, 'hide').and.callThrough();
      spyOn(Snack, 'show').and.callThrough();

      let venueId = 5;

      $stateParams.venueId = venueId;

      _mockModifier();
      _startCardItemListController();
      _startController();

      mockModifier.venueId = venueId;

      let modifier2 = new Preoday.Modifier({
        id: 2,
        name: 'test',
        venueId: venueId,
        items: [],
        modifiers: []
      });

      let $modifiers = [modifier2];

      ModifierService.data.modifiers = [mockModifier, modifier2];

      CardItemListCtrl.instance.collection = [mockModifier];

      CardItemListCtrl = CardItemListCtrl();

      ModifierCtrl.instance.modifier = mockModifier;
      ModifierCtrl.instance.cardItemList = CardItemListCtrl;
      ModifierCtrl = ModifierCtrl();

      expect(CardItemListCtrl.collection.length).toBe(1);

      server.respondWith('POST', '/api/modifiers', [200, {"Content-Type": "application/json"}, JSON.stringify($modifiers[0])]);

      expect(ModifierCtrl.modifiers.length).toBe(0);
      expect(ModifierCtrl.modifier.modifiers.length).toBe(0);

      ModifierCtrl.onNewModifierMoved($modifiers);

      setTimeout(() => {

        $rootScope.$digest();

        expect(Spinner.show).toHaveBeenCalled();

        server.respond();

        setTimeout(() => {

          $rootScope.$digest();

          expect(ModifierCtrl.modifiers.length).toBe(1);
          expect(ModifierCtrl.modifier.modifiers.length).toBe(1);

          expect(ModifierCtrl.modifiers[0].id).toBe($modifiers[0].id);
          expect(ModifierCtrl.modifier.modifiers[0].id).toBe($modifiers[0].id);

          expect(Spinner.hide).toHaveBeenCalled();
          expect(Snack.show).toHaveBeenCalled();
          expect(ModifierService.canAddModifiers).toHaveBeenCalled();
          expect(ModifierService.isModifiersDuplicated).toHaveBeenCalled();
          expect(ModifierService.addCustomModifierToParent).toHaveBeenCalled();

          done();
        });
      });
    });

    it("Should remove a modifier from a modifier", function(done) {

      let venueId = 5;

      $stateParams.venueId = venueId;

      _mockModifier();
      _startCardItemListController();
      _startController();

      let modifier2 = new Preoday.Modifier({
        id: 2,
        name: 'test',
        venueId: venueId,
        items: [],
        modifiers: []
      });

      let $modifiers = [modifier2];

      mockModifier.venueId = venueId;
      mockModifier.modifiers = [modifier2];

      ModifierService.data.modifiers = [mockModifier, modifier2];

      CardItemListCtrl.instance.collection = [mockModifier];

      CardItemListCtrl = CardItemListCtrl();

      ModifierCtrl.instance.modifier = mockModifier;
      ModifierCtrl.instance.cardItemList = CardItemListCtrl;
      ModifierCtrl = ModifierCtrl();

      expect(CardItemListCtrl.collection.length).toBe(1);

      server.respondWith('DELETE', '/api/modifiers/' + mockModifier.modifiers[0].id, [200, {"Content-Type": "application/json"}, JSON.stringify({})]);

      expect(ModifierCtrl.modifiers.length).toBe(1);
      expect(ModifierCtrl.modifier.modifiers.length).toBe(1);

      ModifierCtrl.onModifierRemoved(mockModifier.modifiers[0]);

      setTimeout(() => {

        $rootScope.$digest();

        server.respond();

        setTimeout(() => {

          $rootScope.$digest();

          expect(ModifierCtrl.modifiers.length).toBe(0);
          expect(ModifierCtrl.modifier.modifiers.length).toBe(0);

          done();
        });
      });
    });
});
