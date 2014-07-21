
angular.module('switch.controllers',[]).
  controller('switchController', function($scope,$http) {

  	$scope.form = {};
    $scope.finishedLoading = true;

    $scope.processForm = function($form) {
        $scope.isPosting =true;

        var query;
        if ( $scope.form.name ) {
        	query = {
        		admin : $scope.form.name
        	};
        } else if ( $scope.form.code ) {
        	query = {
        		code : $scope.form.code
        	};
        }

        if ( query ) {
            $http.get('/api/venues', { params : query })
            .success(function(data, status, headers, config) {
                // Success
                $scope.isPosting =false;

                $scope.venues = data;
            })
            .error(function(data, status, headers, config) {
                // Error
                $scope.isPosting =false;
                
                noty({
                  type: 'error',  layout: 'topCenter',
                  text: _tr("Sorry, but there's been an error processing your request.")
                });

                console.log(data);
            });

        } else {
        	$scope.isPosting =false;
        }

    }

    $scope.switchAccount = function(venue) {
        if ( window.confirm("This will not end well") ) {
            $scope.finishedLoading =false;

            // Set the new account
            $http.post('/api/accounts/' + venue.accountId + '/switch')
            .success(function(data, status, headers, config) {
                $scope.finishedLoading =true;

                noty({ 
                    type: 'success',
                    text: 'You user has been switched to the ' + venue.name + ' account.<br>' +
                        ' You will now be logged out for the settings to take effect.'
                });
                setTimeout(function(){window.location.replace("/logout");}, 2500);

            })
            .error(function(data, status, headers, config) {
                // Error
                $scope.finishedLoading =true;
                
                noty({
                  type: 'error',  layout: 'topCenter',
                  text: _tr("Sorry, but there's been an error processing your request.")
                });

                console.log(data);
            });

            // logout
        }

    }
    
  });