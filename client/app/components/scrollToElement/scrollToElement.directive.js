export default function scrollToElement($timeout, $window){
  "ngInject";
  return {
    restrict: 'A',
    link: (scope, element, attr) => {

    	scope.$on('$scrollMainToBottom', () => {

    		$timeout(() => {

    			element.scrollTop(element[0].scrollHeight);
    		});	
    	});

      element.bind('scroll', _onScroll);

      function _onScroll(){

        //check if Scroll is 25px near bottom of page
        var checkIfBottom = (element[0].scrollHeight -  element[0].scrollTop) <= $window.innerHeight + 25;
        if(checkIfBottom){          
          scope.$broadcast('$scrollToEndOfPage', () => {
            
          });
        }   
      }      
    }
  };
}