// Import Style
import './cardOverlay.scss';


// Import internal modules
import directive from './cardOverlay.directive';


export default angular.module("cardOverlay" , [])

  .directive("cardOverlay", directive)
  .name;
