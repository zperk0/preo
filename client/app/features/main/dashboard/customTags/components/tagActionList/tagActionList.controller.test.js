'use strict';

import tagActionList from './';

describe('tagActionList Controller', function () {

    let
      TagActionListCtrl,
      $rootScope,
      $scope,
      $stateParams,
      Spinner,
      Snack,
      LabelService,
      server,
      $controller;

    beforeEach(angular.mock.module('webapp'));
    beforeEach(angular.mock.module(tagActionList));

    beforeEach(angular.mock.inject(function ($injector) {

      $rootScope = $injector.get('$rootScope');
      $controller = $injector.get('$controller');
      $stateParams = $injector.get('$stateParams');
      Spinner = $injector.get('Spinner');
      Snack = $injector.get('Snack');
      LabelService = $injector.get('LabelService');

      $scope = $rootScope.$new();

      $scope.scrollToBottom = () => {};
    }));

    afterEach(function() {

      server.restore();
    });

    function _startController() {

      TagActionListCtrl = $controller('tagActionListController', {
        '$scope': $scope
      }, true);

      server = sinon.fakeServer.create();
    }

    it("Should initialize the controller", function() {

      let venueId = 5;

      $stateParams.venueId = venueId;

      _startController();

      TagActionListCtrl = TagActionListCtrl();

      expect(TagActionListCtrl.showCreateTagAction).toEqual(jasmine.any(Function));
      expect(TagActionListCtrl.createTagAction).toEqual(jasmine.any(Function));
      expect(TagActionListCtrl.deleteTagAction).toEqual(jasmine.any(Function));
    });

    it("Should create a tag action", function() {

      let venueId = 5;

      $stateParams.venueId = venueId;

      _startController();

      TagActionListCtrl = TagActionListCtrl();

      TagActionListCtrl.showCreateTagAction();

      expect(TagActionListCtrl.tagActions.length).toBe(1);
    });

    it("Shouldn't create duplicated tag action", function() {

      let venueId = 5;

      $stateParams.venueId = venueId;

      _startController();

      TagActionListCtrl = TagActionListCtrl();

      TagActionListCtrl.showCreateTagAction();
      TagActionListCtrl.showCreateTagAction();

      expect(TagActionListCtrl.tagActions.length).toBe(1);
    });
});
