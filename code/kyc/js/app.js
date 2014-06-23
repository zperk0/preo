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
  'mm.foundation'

]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {templateUrl: '/code/kyc/partials/dashboard.html', controller: 'DashboardCtrl',
    resolve:{
       load: function ($route, AllCharts) {          
          return AllCharts.promise;            
        }
    }
  });
  $routeProvider.when('/stock', {templateUrl: '/code/kyc/partials/stock.html', controller: 'StockCtrl',
      resolve:{
       load: function ($route, OrderService) {          
          return OrderService.load();            
        }
    }
  });
  $routeProvider.when('/customers', {templateUrl: '/code/kyc/partials/customers.html', controller: 'CustomersCtrl',
    resolve:{
       load: function ($route, OrderService) {          
          return OrderService.load();            
        }
    }
  });
  $routeProvider.when('/reports', {templateUrl: '/code/kyc/partials/reports.html', controller: 'ReportsCtrl',
    resolve:{
       load: function ($route, OrderService) {          
          return OrderService.load();            
        }
    }
  });
  $routeProvider.when('/stream', {templateUrl: '/code/kyc/partials/stream.html', controller: 'StreamCtrl',
     resolve: {
        load: function ($route, StreamService) {          
          return StreamService.load();            
        }
    }
  });
  $routeProvider.otherwise({redirectTo: '/dashboard'});
}]);
