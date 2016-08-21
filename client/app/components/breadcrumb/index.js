// Import Style
import './breadcrumb.scss';



// Import internal modules
import directive from './breadcrumb.directive';

export default angular.module("breadcrumb" , [])

  .directive("breadcrumb", directive)
  .name;
