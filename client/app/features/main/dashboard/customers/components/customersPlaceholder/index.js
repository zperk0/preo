
// Import internal modules
import directive from './customersPlaceholder.directive';

export default angular.module("customersPlaceholder" , [])
  .directive("customersPlaceholder", directive)
  .name;
