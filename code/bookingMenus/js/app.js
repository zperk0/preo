(function() {
  'use strict';

  var app = angular.module('bookingMenus',
    ['ngRoute', 'constants', 'loaders', 'mm.foundation', 'gettext'])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.
                when('/', {
                    templateUrl: '/code/bookingMenus/partials/booking-menus.php'
                }).
                otherwise({
                    redirectTo: '/'
                });
        }])
        .run(['$rootScope', 'gettextCatalog', 'LANG', '$http', 'ACCOUNT_ID', 'FEATURE_STATUS', 'FEATURES',
          function($rootScope, gettextCatalog, LANG, $http, ACCOUNT_ID, FEATURE_STATUS, FEATURES) {

            $rootScope.requests = 0;

            var lang = 'en_GB',
                language = 'en';

            switch (LANG) {
                case 'de':
                    lang = 'de_DE';
                    break;
                case 'fr':
                    lang = 'fr_FR';
                    break;
                case 'nb':
                    lang = 'nb_NO';
                    break;
            }

            language = lang.substr(0, lang.indexOf('_'));

            if (lang != 'en_GB') {

                gettextCatalog.currentLanguage = lang;
                moment.locale(language);
            }

                 $http.get("/api/accounts/"+ACCOUNT_ID+"/features/"+ FEATURES.BOOKING).then(
              function(result){
                var found = false;
                  if (result && result.data && (result.data.status === "INSTALLED" || result.data.status === "TRIAL" || result.data.status === "UNINSTALLED")) {
                      found = true;
                  }
                if (!found) {
                  window.location.replace("/dashboard");
                }
            });

        }]);
})();