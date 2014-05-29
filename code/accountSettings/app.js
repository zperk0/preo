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
        templateUrl: '/code/accountSettings/partials/profile.html',
        controller: 'ProfileCtrl'
      }).      
      when('/subscription', {
        templateUrl: '/code/accountSettings/partials/subscription.html',
        controller: 'SubscriptionCtrl'
      }).      
      when('/paymentMethod', {
        templateUrl: '/code/accountSettings/partials/payment.html',
        controller: 'PaymentCtrl'
      }).      
      when('/billingHistory', {
        templateUrl: '/code/accountSettings/partials/billingHistory.html',
        controller: 'BillingHistoryCtrl'
      }).      
      otherwise({
        redirectTo: '/profile'
      });
  }]);

//control module
angular.module('accountSettings.controllers',[]);