'use strict';

import itemList from './';

describe('itemList Controller', function () {

    let
      ItemListCtrl,
      $rootScope,
      $scope,
      $timeout,
      $q,
      $stateParams,
      FeatureService,
      ItemService,
      $controller;

    beforeEach(angular.mock.module('webapp'));
    beforeEach(angular.mock.module(itemList));

    beforeEach(angular.mock.inject(function ($injector) {

      $rootScope = $injector.get('$rootScope');
      $controller = $injector.get('$controller');
      $timeout = $injector.get('$timeout');
      $q = $injector.get('$q');
      $stateParams = $injector.get('$stateParams');
      FeatureService = $injector.get('FeatureService');
      ItemService = $injector.get('ItemService');

      $scope = $rootScope.$new();
    }));

    afterEach(function() {

    });

    function _startController() {

      ItemListCtrl = $controller('itemListController', {
        '$scope': $scope,
        'tags': []
      }, true);
    }

    it("Should initialize the controller", function() {

      spyOn(FeatureService, 'hasFeature');
      spyOn(ItemService, 'getItems').and.returnValue($q.reject());

      let venueId = 5;

      $stateParams.venueId = venueId;

      _startController();

      ItemListCtrl = ItemListCtrl();

      expect(ItemListCtrl.getItems).toEqual(jasmine.any(Function));
      expect(ItemListCtrl.toggleDrawer).toEqual(jasmine.any(Function));
      expect(ItemListCtrl.hideSpinner).toEqual(jasmine.any(Function));
      expect(ItemListCtrl.showSpinner).toEqual(jasmine.any(Function));

      expect(FeatureService.hasFeature).toHaveBeenCalledWith(Preoday.constants.Feature.NESTED_MODIFIER);
      expect(ItemService.getItems).toHaveBeenCalled();
      
    });

    it("Should fetch the items", function() {

      let items = [new Preoday.Item({
        modifiers: []
      }), new Preoday.Item({
        modifiers: []
      })];

      spyOn(FeatureService, 'hasFeature');
      spyOn(ItemService, 'getItems').and.returnValue(items);
      
      let venueId = 5;

      $stateParams.venueId = venueId;

      _startController();

      ItemListCtrl = ItemListCtrl();

      expect(FeatureService.hasFeature).toHaveBeenCalledWith(Preoday.constants.Feature.NESTED_MODIFIER);
      expect(ItemService.getItems).toHaveBeenCalled();
      expect(ItemListCtrl.items.length).toBe(items.length);
      
    });
});
