// Import Style
import './styleEditor.scss';

// Import internal modules
import directive from './styleEditor.directive';

export default angular.module("styleEditor" , [])
  .directive("styleEditor", directive)
  .name;
