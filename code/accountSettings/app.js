//shop
var app = angular.module('accountSettings', [  
  'ngRoute',
  'accountSettings.resources',
  'accountSettings.controllers'
]);

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
        templateUrl: '/code/accountSettings/partials/billingHistory.html',
        controller: 'BillingHistoryCtrl'
      }). 
      when('/changePassword', {
        templateUrl: '/code/accountSettings/partials/password.php',
        controller: 'PasswordCtrl'
      }).   
      otherwise({
        redirectTo: '/profile'
      });
  }]);

//control module
angular.module('accountSettings.controllers',[]);

//resources module
angular.module('accountSettings.resources',['ngResource']);