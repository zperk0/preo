angular.module('kyc.directives')
	.directive('dotdotdot', function(){
		return {
			restrict: 'A',
			link: function(scope, element, attributes) {
				scope.$watch(function() {
					element.dotdotdot({watch: true});
				});
			}
		}
	});
