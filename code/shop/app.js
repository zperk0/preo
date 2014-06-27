angular.module('features',[])

//shop
angular.module('shop', [
  'ngResource',
  'features',
  'shop.resources',
  'notification',
  'shop.controllers',
  'mm.foundation'
]);

