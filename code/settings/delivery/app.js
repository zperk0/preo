//delivery

angular.module('delivery', [
  'ngResource',
  'ngRoute',
  'delivery.resources',
  'delivery.controllers',
  'delivery.directives',
  'constants',
  'gettext'
])
.run(['LANG', 'gettextCatalog', function(LANG, gettextCatalog) {

  var lang = 'en_GB';

  switch(LANG) {
    case 'de': lang = 'de_DE'; break;
    case 'fr': lang = 'fr_FR'; break;
    case 'nb': lang = 'nb_NO'; break;
  }

  if(lang != 'en_GB') {

    gettextCatalog.currentLanguage = lang;
    // gettextCatalog.debug = true;
  }
}])
.config(['$routeProvider', function( $routeProvider ) {
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