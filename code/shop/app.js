angular.module('features',[])

//shop
angular.module('shop', [
  'ngResource',
  'features',
  'shop.resources',
  'shop.controllers'
]);

