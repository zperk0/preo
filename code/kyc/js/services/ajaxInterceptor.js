angular.module('kyc.services').service('$AjaxInterceptor', ['$rootScope', '$timeout', function( $rootScope, $timeout ) {

	return {
		start: function(){
			++$rootScope.requests;
		},
		complete: function(){
			if ( $rootScope.requests  ) {
				$timeout(function(){
					--$rootScope.requests;
				}, 1000);
			}
		},
		isRequesting: function(){
			return $rootScope.requests > 0;
		}
	};

}])