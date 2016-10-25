// Import Style
import './taxGroupSelect.scss';


// Import internal modules
import controller from './taxGroupSelect.controller';
import directive from './taxGroupSelect.directive';



export default angular.module("taxGroupSelect" , [])


  .controller(controller.UID, controller)
  .directive("taxGroupSelect", directive)
  .name;
