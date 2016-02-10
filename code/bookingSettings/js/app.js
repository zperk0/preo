(function() {
  'use strict';

  var app = angular.module('bookingSettings',
  ['ngRoute', 'constants', 'loaders', 'mm.foundation', 'gettext'])
      .config(['$routeProvider', function($routeProvider) {
          $routeProvider.
              when('/', {
                  templateUrl: '/code/bookingSettings/partials/booking-settings.php'
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

          $http.get("/api/accounts/"+ACCOUNT_ID+"/packages").then(
              function(result){
                var found = false;
                if (result && result.data){
                  for (var i = 0, len = result.data.length; i < len; i++) {
                    var accountPackage = result.data[i];
                    if (accountPackage && accountPackage.preoPackage && accountPackage.preoPackage.features) {
                      for (var j = 0, lenJ = accountPackage.preoPackage.features.length; j < lenJ; j++) {
                        var feature = accountPackage.preoPackage.features[j];
                        //TODO replace the account feature resource with a model and rework the local statuses
                        if (feature.id === FEATURES.BOOKING && (accountPackage.status === FEATURE_STATUS.INSTALLED || accountPackage.status === FEATURE_STATUS.TRIAL || accountPackage.status === FEATURE_STATUS.UNINSTALLED)) {
                          found = true;
                          break;
                        }
                      }
                    }

                    if (found) {
                      break;
                    }
                  }
                }
                if (!found) {
                  window.location.replace("/dashboard");
                }
            });

      }]);

})();