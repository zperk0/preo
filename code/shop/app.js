angular.module('features',[])

//shop
angular.module('shop', [
  'ngResource',
  'features',
  'loaders',
  'shop.resources',
  'notification',
  'shop.controllers',
  'mm.foundation'
])
.run(['$rootScope', function( $rootScope ) {
  $rootScope.requests = 0;
}]);

