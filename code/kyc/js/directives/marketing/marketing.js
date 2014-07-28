angular.module('kyc.directives')
	.directive('marketing', ['MarketingResources',function(MarketingResources) {
	
	  return {
	      restrict: 'A',
	      replace: 'true',
	      templateUrl: '/code/kyc/js/directives/marketing/header.php',
				scope: {
  				chart: '=element'
  			},
				link: function($scope, element, attrs){
					var tag = element[0].tagName.toLowerCase();
					$scope.which = attrs['marketing']
					$scope.marketing = MarketingResources[$scope.which];
					
					if (tag === 'th'){
						$scope.setOrderBy = function(which){																
							$scope.$parent.setOrderBy(which);
						}
					}
				}
	  };
}]);


