'use strict';
angular.module('features',[]);

// Declare app level module which depends on filters, and services
angular.module('kyc', [
  'ngRoute',
  'kyc.filters',
  'kyc.services',
  'kyc.directives',
  'kyc.controllers',
  'mm.foundation'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {templateUrl: '/code/kyc/partials/dashboard.html', controller: 'DashboardCtrl'});
  $routeProvider.when('/stock', {templateUrl: '/code/kyc/partials/stock.html', controller: 'StockCtrl'});
  $routeProvider.when('/customers', {templateUrl: '/code/kyc/partials/customers.html', controller: 'CustomersCtrl'});
  $routeProvider.when('/reports', {templateUrl: '/code/kyc/partials/reports.html', controller: 'ReportsCtrl'});
  $routeProvider.when('/stream', {templateUrl: '/code/kyc/partials/stream.html', controller: 'StreamCtrl'});
  $routeProvider.otherwise({redirectTo: '/dashboard'});
}]);
