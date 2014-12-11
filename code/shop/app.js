angular.module('packages',[])
angular.module('resources',['ngResource'])

//shop
angular.module('shop', [
  'ngResource',
  'packages',
  'loaders',
  'ngRoute',
  'shop.resources',
  'notification',
  'shop.controllers',
  'mm.foundation',
  'resources',
  'constants'
])
.run(['$rootScope', function( $rootScope ) {
  $rootScope.requests = 0;
}]);

