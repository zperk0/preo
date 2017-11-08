// Import Style
import './searchPanel.scss';


// Import internal modules
import directive from './searchPanel.directive';

export default angular.module("searchPanel" , [])
  .directive("searchPanel", directive)
  .name;


