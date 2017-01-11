
// Import internal modules
import directive from './iframeLoad.directive';

export default angular.module("iframeLoad" , [])
  .directive("iframeLoad", directive)
  .name;
