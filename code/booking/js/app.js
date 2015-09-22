var app = angular.module('booking',
['ngRoute', 'constants', 'loaders', 'mm.foundation', 'gettext', 'ngOrderObjectBy'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: '/code/booking/partials/booking.php'
            }).
            otherwise({
                redirectTo: '/'
            });
    }])
    .run(['$rootScope', 'gettextCatalog', 'LANG', function($rootScope, gettextCatalog, LANG) {

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

    }]);