'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {templateUrl: 'partials/dashboard.html', controller: 'DashboardCtrl'});
  $routeProvider.when('/stock', {templateUrl: 'partials/stock.html', controller: 'StockCtrl'});
  $routeProvider.when('/customers', {templateUrl: 'partials/customers.html', controller: 'CustomersCtrl'});
  $routeProvider.when('/reports', {templateUrl: 'partials/reports.html', controller: 'ReportsCtrl'});
  $routeProvider.when('/stream', {templateUrl: 'partials/stream.html', controller: 'StreamCtrl'});
  $routeProvider.otherwise({redirectTo: '/dashboard'});
}]);
