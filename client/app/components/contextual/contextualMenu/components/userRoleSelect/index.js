// Import Style
import './userRoleSelect.scss';


// Import internal modules
import controller from './userRoleSelect.controller';
import directive from './userRoleSelect.directive';



export default angular.module("userRoleSelect" , [])


  .controller(controller.UID, controller)
  .directive("userRoleSelect", directive)
  .name;
