// Import internal modules
import directive from './scrollToElement.directive';

export default angular.module("scrollToElement" , [])

  .directive("scrollToElement", directive)
  .name;
