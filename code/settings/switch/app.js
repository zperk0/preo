//delivery

angular.module('switch', [
  'switch.controllers'
]);


angular.module('switch.controllers',[]).
  controller('switchController', function($scope,$http) {

  	$scope.form = {};
    $scope.finishedLoading = true;

    function errorHandler(data, status, headers, config) {
        // Error
        $scope.isPosting =false;
        
        noty({
          type: 'error',  layout: 'topCenter',
          text: _tr("Sorry, but there's been an error processing your request.")
        });

        console.log(data);
    }

    $scope.processForm = function($form) {
        $scope.isPosting =true;
        delete $scope.accounts;
        delete $scope.venues;
        delete $scope.query;

        var query;
        if ( $scope.form.code ) {
        	query = {
        		code : $scope.form.code
        	};
        } else if ( $scope.form.name ) {
        	query = {
        		name : $scope.form.name
        	};
        } else if ( $scope.form.admin ) {
        	query = {
        		admin : $scope.form.admin
        	};
        }

        if ( query ) {
        	$scope.query = query;

            $http.get('/api/venues', { params : query })
            .success(function(data, status, headers, config) {

            	if ( (!data || !data.length) && query.admin ) {
            		// no result so if this is a admin search try accounts
        			$http.get('/api/accounts', { params : query })
        			.success(function(data, status, headers, config) {
		                // Success
		                $scope.isPosting =false;

		                $scope.accounts = data;
        			})
        			.error(errorHandler);

            	} else {
	                // Success
	                $scope.isPosting =false;

	                $scope.venues = data;
	            }
            })
            .error(errorHandler);

        } else {
        	$scope.isPosting =false;
        }

    }

    $scope.switchAccount = function(venueOrAccount) {
        if ( window.confirm("Are you sure you wish to switch your account to: \n" + venueOrAccount.name) ) {
            window.localStorage.clear();                    
            $scope.finishedLoading = false;            

            // Set the new account
            $http.post('/api/accounts/' + (venueOrAccount.accountId || venueOrAccount.id) + '/switch')
            .success(function(data, status, headers, config) {
                $scope.finishedLoading =true;

                noty({ 
                    type: 'success',
                    text: 'You user has been switched to the ' + venueOrAccount.name + ' account.<br>' +
                        ' You will now be logged out for the settings to take effect.'
                }); 
                

            	// logout
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
        }
    }
    
  });