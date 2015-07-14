var app = angular.module('events', ['ngRoute', 'constants','webapp.components', 'loaders'])
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
]);