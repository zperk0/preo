'use strict';
angular.module('kyc.controllers', [])
angular.module('kyc.resources', [])
angular.module('kyc.charts',[])
angular.module('kyc.services',[])
angular.module('kyc.directives',[])
angular.module('kyc.reports',[])


// Declare app level module which depends on filters, and services
angular.module('kyc', [
  'ngRoute',
  'ngResource',
  'ngSanitize',
  'kyc.directives',
  'kyc.resources',
  'kyc.services',
  'kyc.charts',
  'kyc.controllers',
  'kyc.resources',
  'kyc.filters',
  'kyc.reports',
  'loaders',
  'notification',
  'mm.foundation',
  'ui.select2',
  'constants',
  'gettext'
])
.run(['$rootScope','ACCOUNT_ID','$http','LANG', 'gettextCatalog', function( $rootScope,ACCOUNT_ID,$http, LANG, gettextCatalog) {

  $rootScope.requests = 0;

  var lang = 'en_US';

  switch(LANG) {
    case 'de': lang = 'de_DE'; break;
    case 'fr': lang = 'fr_FR'; break;
    case 'nb': lang = 'nb_NO'; break;
  }

  if(lang != 'en_US') {

    gettextCatalog.currentLanguage = lang;
    // gettextCatalog.debug = true;
  }

  $http.get("/api/accounts/"+ACCOUNT_ID+"/packages").then(
    function(result){
      var found = false;
      if (result && result.data){
        for (var i = 0, len = result.data.length; i < len; i++) {
          var accountPackage = result.data[i];
          if (accountPackage && accountPackage.preoPackage && accountPackage.preoPackage.features) {
            for (var j = 0, lenJ = accountPackage.preoPackage.features.length; j < lenJ; j++) {
              var feature = accountPackage.preoPackage.features[j];
              //TODO replace the account feature resource with a model and rework the local statuses
              if (feature.id === 4 && (accountPackage.status === "INSTALLED" || accountPackage.status === "TRIAL" || accountPackage.status === "UNINSTALLED")) {
                found = true;
                break;
              }
            }
          }

          if (found) {
            break;
          }
        }
      }
      if (!found) {
        window.location.replace("/dashboard");
      }
  })
}])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {templateUrl: '/code/kyc/partials/dashboard.php', controller: 'DashboardCtrl',
    resolve:{
       load: ['$route', 'AllCharts','$AjaxInterceptor', function ($route, AllCharts,$AjaxInterceptor) {
          $AjaxInterceptor.start();
          return AllCharts.promise;
        }]
    }
  });
  $routeProvider.when('/stock', {templateUrl: '/code/kyc/partials/stock.php', controller: 'StockCtrl',
      resolve:{
       load: ['$route', 'OrderService','$AjaxInterceptor', function ($route, OrderService,$AjaxInterceptor) {
          $AjaxInterceptor.start();
          return OrderService.load();
        }]
    }
  });
  $routeProvider.when('/customers', {templateUrl: '/code/kyc/partials/customers.php', controller: 'CustomersCtrl',
    resolve:{
       load: ['$route', 'OrderService','$AjaxInterceptor', function ($route, OrderService,$AjaxInterceptor) {
          $AjaxInterceptor.start();
          return OrderService.load();
        }]
    }
  });
  $routeProvider.when('/reports', {templateUrl: '/code/kyc/partials/reports.php', controller: 'ReportsCtrl',
    resolve:{
       load: ['$route', 'AllReports','$AjaxInterceptor', function ($route, AllReports,$AjaxInterceptor) {
          $AjaxInterceptor.start();
          return AllReports.init();
        }]
    }
  });
  $routeProvider.when('/stream', {templateUrl: '/code/kyc/partials/stream.php', controller: 'StreamCtrl',
     resolve: {
        load: ['$route', 'OrderService','$AjaxInterceptor', function ($route, OrderService,$AjaxInterceptor) {
          $AjaxInterceptor.start();
          return OrderService.load();
        }]
    }
  });
  $routeProvider.when('/events', {templateUrl: '/code/kyc/partials/events.php', controller: 'EventsCtrl',
     resolve: {
        load: ['$route', 'OrderService','$AjaxInterceptor', function ($route, OrderService,$AjaxInterceptor) {
          $AjaxInterceptor.start();
          return OrderService.load();
        }]
    }
  });
  $routeProvider.when('/orders', {templateUrl: '/code/kyc/partials/orders.php', controller: 'OrdersCtrl',
      resolve: {
          load: ['$route', 'OrderService','$AjaxInterceptor', function ($route, OrderService,$AjaxInterceptor) {
              $AjaxInterceptor.start();
              return OrderService.load();
          }]
      }
  });
  $routeProvider.otherwise({redirectTo: '/dashboard'});
}]);