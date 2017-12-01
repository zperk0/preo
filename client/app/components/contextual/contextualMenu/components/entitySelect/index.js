// Import Style
import './entitySelect.scss';


// Import internal modules
import controller from './entitySelect.controller';
import directive from './entitySelect.directive';


export default angular.module("entitySelect" , [])

  .controller(controller.UID, controller)
  .directive("entitySelect", directive)
  .name;
