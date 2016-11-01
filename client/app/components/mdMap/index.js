// Import Style
import './mdMap.scss';

// Import internal modules
import directive from './mdMap.directive';

export default angular.module("mdMap" , [])

  .directive("mdMap", directive)
  .name;
