angular.module('accountSettings.controllers',[]);
angular.module('accountSettings.resources',['ngResource']);
angular.module('resources',['ngResource'])

//shop
var app = angular.module('accountSettings', [
  'ngRoute',
  'accountSettings.resources',
  'accountSettings.controllers',
  'loaders',
  'mm.foundation',
  'notification',
  'resources',
  'constants',
  'gettext'
]).run(['$rootScope', 'gettextCatalog', 'LANG', function( $rootScope, gettextCatalog, LANG ) {

  $rootScope.requests = 0;

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
        redirectTo:  HAS_BILLING ? '/subscription' : '/profile'
      });
  }]);
