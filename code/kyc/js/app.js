'use strict';
angular.module('features',[]);
angular.module('kyc.controllers', [])
angular.module('kyc.resources', [])

// Declare app level module which depends on filters, and services
angular.module('kyc', [
  'ngRoute',
  'ngResource',
  'kyc.filters',
  'kyc.services',
  'kyc.directives',
  'kyc.controllers',  
  'kyc.resources',
  'mm.foundation'

]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {templateUrl: '/code/kyc/partials/dashboard.html', controller: 'DashboardCtrl'});
  $routeProvider.when('/stock', {templateUrl: '/code/kyc/partials/stock.html', controller: 'StockCtrl'});
  $routeProvider.when('/customers', {templateUrl: '/code/kyc/partials/customers.html', controller: 'CustomersCtrl'});
  $routeProvider.when('/reports', {templateUrl: '/code/kyc/partials/reports.html', controller: 'ReportsCtrl'});
  $routeProvider.when('/stream', {templateUrl: '/code/kyc/partials/stream.html', controller: 'StreamCtrl'});
  $routeProvider.otherwise({redirectTo: '/dashboard'});
}]).
run(['$rootScope', function( $rootScope ) {
  $rootScope.requests = 0;
}]);


angular.module('kyc.services', ['ngResource'], ['$httpProvider', '$locationProvider', '$provide',

    function ($httpProvider, $locationProvider, $provide) {

        
        $locationProvider.html5Mode(false);

        
        $httpProvider.interceptors.push(['$q', '$window', '$injector', '$AjaxInterceptor', function ($q, $window, $injector, $AjaxInterceptor) {
            return {
                
                request: function (config) {

                    $AjaxInterceptor.start();

                    return config || $q.when(config);
                },

                
                response: function (response) {

                    $AjaxInterceptor.complete();

                    return response || $q.when(response);
                }
            };
        }]);
    }]);