// Import Style
import './venueModeSelect.scss';



// Import internal modules
import controller from './venueModeSelect.controller';
import directive from './venueModeSelect.directive';



export default angular.module("venueModeSelect" , [])


  .controller(controller.UID, controller)
  .directive("venueModeSelect", directive)
  .name;
