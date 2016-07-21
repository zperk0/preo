'use strict';

import menu from './';

describe('Menu Controller', function () {

    let
      MenuCtrl,
      $rootScope,
      $scope,
      $stateParams,
      $controller,
      Spinner,
      $timeout,
      server;

    beforeEach(angular.mock.module(menu));

    beforeEach(angular.mock.inject(function ($injector) {

      $controller = $injector.get('$controller');
      $rootScope = $injector.get('$rootScope');
      $stateParams = $injector.get('$stateParams');
      Spinner = $injector.get('Spinner');
      $timeout = $injector.get('$timeout');
      $scope = $rootScope.$new();

      server = sinon.fakeServer.create();
    }));

    afterEach(function() {

      server.restore();
    });

    function _startController() {

      MenuCtrl = $controller('menuController', {
        '$scope': $scope,
      });
    }

    it("Should initialize the menuCtrl", function(done) {

      spyOn(Spinner, 'show').and.callThrough();
      spyOn(Spinner, 'hide').and.callThrough();
      spyOn(Preoday.Menu, 'get').and.callThrough();

      $stateParams.menuId = 1;

      let menu = {
        id: 1
      };

      server.respondWith('GET', '/api/menus/' + menu.id, [200, {"Content-Type": "application/json"}, JSON.stringify(menu)]);

      _startController();

      server.respond();
      $rootScope.$digest();

      setTimeout(function () {

        $rootScope.$digest();
        $timeout.flush();

        expect(Spinner.show).toHaveBeenCalledWith('menu');
        expect(Spinner.hide).toHaveBeenCalledWith('menu');
        expect(Preoday.Menu.get).toHaveBeenCalledWith($stateParams.menuId);
        expect(MenuCtrl.menu.id).toBe(menu.id);

        done();
      });
    });

    it("Should initialize the menuCtrl without a menu", function(done) {

      spyOn(Spinner, 'show').and.callThrough();
      spyOn(Spinner, 'hide').and.callThrough();
      spyOn(Preoday.Menu, 'get').and.callThrough();

      $stateParams.menuId = 1;

      let menu = {
        id: 1
      };

      server.respondWith('GET', '/api/menus/' + menu.id, [400, {"Content-Type": "application/json"}, JSON.stringify(menu)]);

      _startController();

      server.respond();
      $rootScope.$digest();

      setTimeout(function () {

        $rootScope.$digest();

        expect(Spinner.show).toHaveBeenCalledWith('menu');
        expect(Spinner.hide).toHaveBeenCalledWith('menu');
        expect(Preoday.Menu.get).toHaveBeenCalledWith($stateParams.menuId);
        expect(MenuCtrl.menu).toBeUndefined();

        done();
      });
    });

});
