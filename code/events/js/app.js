var app = angular.module('events', ['ngRoute', ])
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