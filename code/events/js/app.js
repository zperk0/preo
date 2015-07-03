var app = angular.module('events', ['ngRoute', 'constants','webapp.components'])
.config(['$routeProvider',
    function($routeProvider) {
        console.log("prividing route");
        $routeProvider.
        when('/', {
            templateUrl: '/code/events/partials/events.php'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);