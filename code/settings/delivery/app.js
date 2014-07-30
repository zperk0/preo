//delivery

angular.module('delivery', [
  'ngResource',
  'ngRoute',
  'delivery.resources',  
  'delivery.controllers',
  'delivery.directives'
]).config(['$routeProvider', function( $routeProvider ) {
  $routeProvider.when('/', {templateUrl: '/code/settings/delivery/partials/delivery.php', controller: 'deliveryController'/*,
    resolve:{
       load: ['$route', 'AllCharts','$AjaxInterceptor', function ($route, AllCharts,$AjaxInterceptor) {          
          $AjaxInterceptor.start();          
          return AllCharts.promise;            
        }]
    }*/
  });
  $routeProvider.when('/notifications', {templateUrl: '/code/settings/delivery/partials/notifications.php', controller: 'notificationCtrl'/*,
    resolve:{
       load: ['$route', 'AllCharts','$AjaxInterceptor', function ($route, AllCharts,$AjaxInterceptor) {          
          $AjaxInterceptor.start();          
          return AllCharts.promise;            
        }]
    }*/
  });

  $routeProvider.otherwise({redirectTo: '/'});
}]);