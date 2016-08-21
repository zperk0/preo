// Import Style
import './pathSelected.scss';


// Import internal modules
import directive from './pathSelected.directive';

export default angular.module("pathSelected" , [])

  .directive("pathSelected", directive)
  .name;
