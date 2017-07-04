// Import Style
import './tagActionBasic.scss';


// Import internal modules
import controller from './tagActionBasic.controller';
import directive from './tagActionBasic.directive';


export default angular.module("tagActionBasic" , [])

  .controller(controller.UID, controller)
  .directive("tagActionBasic", directive)
  .name;
