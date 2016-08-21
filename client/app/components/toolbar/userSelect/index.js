// Import Style
import './userSelect.scss';


// Import internal modules
import controller from './userSelect.controller';
import directive from './userSelect.directive';


export default angular.module("userSelect" , [])

  .controller(controller.UID, controller)
  .directive("userSelect", directive)
  .name;
