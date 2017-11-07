// Import Style
import './taxGroupForm.scss';


// Import internal modules
import controller from './taxGroupForm.controller';
import directive from './taxGroupForm.directive';



export default angular.module("taxGroupForm" , [])

  .controller(controller.UID, controller)
  .directive("taxGroupForm", directive)
  .name;
