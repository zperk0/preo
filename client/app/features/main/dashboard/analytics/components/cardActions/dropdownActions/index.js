// Import Style
import './dropdownActions.scss';


// Import internal modules
import directive from './dropdownActions.directive';
import controller from './dropdownActions.controller';


export default angular.module("dropdownActions" , [])

  .directive("dropdownActions", directive)
  .controller(controller.UID, controller)
  .name;
