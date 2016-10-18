'use strict';

import taxGroupList from './';

describe('taxGroupList Controller', function () {

    let
      $rootScope,
      TaxGroupsListCtrl,
      Spinner,
      $stateParams,
      $scope,
      $timeout,
      ErrorService,
      $controller,
      LabelService,
      $q,
      Snack;

    var taxesMock = [
      new Preoday.Tax({"id":3,"venueId":5,"name":"VAT","displayName":"0 VaT","pickup":0.000,"delivery":null,"seat":null,"voucher":null,"booking":null})
    ]

    beforeEach(angular.mock.module('webapp'));
    beforeEach(angular.mock.module(taxGroupList));

    beforeEach(angular.mock.inject(function ($injector) {
      $rootScope = $injector.get('$rootScope');
      $controller = $injector.get('$controller');
      $timeout = $injector.get('$timeout');
      $stateParams = $injector.get('$stateParams');
      LabelService = $injector.get('LabelService');
      ErrorService = $injector.get('ErrorService');
      Spinner = $injector.get('Spinner');
      $q = $injector.get('$q');
      $scope = $rootScope.$new();
    }));

    beforeEach(function(){
      $stateParams.venueId=9;
    });

    function _startController(ngModel = []) {

      TaxGroupsListCtrl = $controller('taxGroupsCtrl', {
        '$scope': $scope
      });
    }




});