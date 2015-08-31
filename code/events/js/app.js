var app = angular.module('events', ['ngRoute', 'constants', 'webapp.components', 'loaders', 'mm.foundation', 'gettext'])
    .config(['$routeProvider',
        function($routeProvider) {
            console.log("providing route");
            $routeProvider.
            when('/', {
                templateUrl: '/code/events/partials/events.php'
            }).
            otherwise({
                redirectTo: '/'
            });
        }
    ])
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

        console.log('webapp language', language);

        if (lang != 'en_GB') {

            console.log(moment.locale());

            gettextCatalog.currentLanguage = lang;
            // gettextCatalog.debug = true;
            moment.locale(language);
        }

    }]);;