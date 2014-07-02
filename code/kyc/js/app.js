'use strict';
angular.module('features',[]);
angular.module('kyc.controllers', [])
angular.module('kyc.resources', [])
angular.module('kyc.charts',[])
angular.module('kyc.services',[])

// Declare app level module which depends on filters, and services
angular.module('kyc', [
  'ngRoute',
  'ngResource',   
  'kyc.directives',
  'kyc.resources',
  'kyc.services',
  'kyc.charts',
  'kyc.controllers',  
  'kyc.resources',
  'kyc.filters',
  'loaders',
  'mm.foundation'
])
.run(['$rootScope','ACCOUNT_ID','$http', function( $rootScope,ACCOUNT_ID,$http) {
  $rootScope.requests = 0;
  $http.get("/api/accounts/"+ACCOUNT_ID+"/features").then(
    function(result){
      var found = false;  
      if (result && result.data){
        angular.forEach(result.data,function(accountFeature){
            //TODO replace the account feature resource with a model and rework the local statuses            
            if (accountFeature.featureId === 4 && (accountFeature.status === "INSTALLED "|| accountFeature.status === "TRIAL"))
              found = true;
        })  
      }
      if (!found)
        window.location.replace("/dashboard")
  })
}])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {templateUrl: '/code/kyc/partials/dashboard.html', controller: 'DashboardCtrl',
    resolve:{
       load: function ($route, AllCharts,$AjaxInterceptor) {          
          $AjaxInterceptor.start();          
          return AllCharts.promise;            
        }
    }
  });
  $routeProvider.when('/stock', {templateUrl: '/code/kyc/partials/stock.html', controller: 'StockCtrl',
      resolve:{
       load: function ($route, OrderService,$AjaxInterceptor) {          
          $AjaxInterceptor.start();
          return OrderService.load();            
        }
    }
  });
  $routeProvider.when('/customers', {templateUrl: '/code/kyc/partials/customers.html', controller: 'CustomersCtrl',
    resolve:{
       load: function ($route, OrderService,$AjaxInterceptor) {    
          $AjaxInterceptor.start();      
          return OrderService.load();            
        }
    }
  });
  $routeProvider.when('/reports', {templateUrl: '/code/kyc/partials/reports.html', controller: 'ReportsCtrl',
    resolve:{
       load: function ($route, OrderService,$AjaxInterceptor) {          
          $AjaxInterceptor.start();
          return OrderService.load();            
        }
    }
  });
  $routeProvider.when('/stream', {templateUrl: '/code/kyc/partials/stream.html', controller: 'StreamCtrl',
     resolve: {
        load: function ($route, StreamService,$AjaxInterceptor) {  
          $AjaxInterceptor.start();        
          return StreamService.load();            
        }
    }
  });
  $routeProvider.otherwise({redirectTo: '/dashboard'});
}]);