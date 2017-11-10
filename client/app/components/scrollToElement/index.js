// Import internal modules
import directive from './scrollToElement.directive';
import directiveChild from './scrollToChildElement.directive';

export default angular.module("scrollToElement" , [])

  .directive("scrollToElement", directive)
  .directive("scrollToChildElement", directiveChild)
  .name;
