export default function scrollToElement($timeout){
  "ngInject";
  return {
    restrict: 'A',
    link: (scope, element, attr) => {

    	scope.$on('$scrollMainToBottom', () => {

    		$timeout(() => {

    			element.scrollTop(element[0].scrollHeight);
    		});	
    	});
    }
  };
}