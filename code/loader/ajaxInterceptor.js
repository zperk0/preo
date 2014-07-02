angular.module('loaders',[]).
service('$AjaxInterceptor', ['$rootScope', '$timeout', function( $rootScope, $timeout ) {

	function setSpinner(){
		var target = document.getElementsByClassName(".loading-content")
		if (target.length > 0)
			var spinner = new Spinner().spin(target[0]);
	}

	return {
		start: function(){			
			++$rootScope.requests;
			setSpinner();
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