'use strict';
angular.module('features',[]);
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
  'ui.select2'
])
.run(['$rootScope','ACCOUNT_ID','$http', function( $rootScope,ACCOUNT_ID,$http) {
  $rootScope.requests = 0;
  $http.get("/api/accounts/"+ACCOUNT_ID+"/features").then(
    function(result){
      var found = false;  
      if (result && result.data){
        angular.forEach(result.data,function(accountFeature){
            //TODO replace the account feature resource with a model and rework the local statuses            
            if (accountFeature.featureId === 4 && (accountFeature.status === "INSTALLED" || accountFeature.status === "TRIAL" || accountFeature.status === "UNINSTALLED"))
              found = true;
        })  
      }
      if (!found)
        window.location.replace("/shop#/feature/4")
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
  $routeProvider.otherwise({redirectTo: '/dashboard'});
}]);