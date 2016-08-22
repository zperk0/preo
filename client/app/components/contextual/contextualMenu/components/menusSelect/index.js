// Import Style
import './menusSelect.scss';


// Import internal modules
import controller from './menusSelect.controller';
import directive from './menusSelect.directive';



export default angular.module("menusSelect" , [])


  .controller(controller.UID, controller)
  .directive("menusSelect", directive)
  .name;
