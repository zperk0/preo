angular.module('features',[])
angular.module('accountSettings.controllers',[]);
angular.module('accountSettings.resources',['ngResource']);

//shop
var app = angular.module('accountSettings', [  
  'ngRoute',
  'features',
  'accountSettings.resources',
  'accountSettings.controllers',
  'loaders'
]).run(['$rootScope', function( $rootScope ) {
  $rootScope.requests = 0;
}]);

//router
app.config(['$routeProvider',
  function($routeProvider) {
  	console.log("prividing route");
    $routeProvider.
      when('/profile', {
        templateUrl: '/code/accountSettings/partials/profile.php',
        controller: 'ProfileCtrl'
      }).      
      when('/subscription', {
        templateUrl: '/code/accountSettings/partials/subscription.php',
        controller: 'SubscriptionCtrl'
      }).      
      when('/paymentMethod', {
        templateUrl: '/code/accountSettings/partials/payment.php',
        controller: 'PaymentCtrl'
      }).      
      when('/billingHistory', {
        templateUrl: '/code/accountSettings/partials/billingHistory.php',
        controller: 'BillingCtrl'
      }). 
      when('/changePassword', {
        templateUrl: '/code/accountSettings/partials/password.php',
        controller: 'PasswordCtrl'
      }).   
      otherwise({
        redirectTo: '/profile'
      });
  }]);
