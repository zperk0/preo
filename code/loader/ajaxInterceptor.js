angular.module('loaders',[]).
service('$AjaxInterceptor', ['$rootScope', '$timeout', function( $rootScope, $timeout ) {

	return {
		start: function(){
			console.log('started hooo')			
			++$rootScope.requests;
		},
		complete: function(){			
			$timeout(function(){
				if ( $rootScope.requests >0) {
					--$rootScope.requests;
				}
			}, 100);		
		},
		isRequesting: function(){
			return $rootScope.requests > 0;
		}
	};

}])