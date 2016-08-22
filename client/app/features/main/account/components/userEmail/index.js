// Import Style
import './userEmail.scss';


// Import internal modules
import controller from './userEmail.controller';
import directive from './userEmail.directive';



export default angular.module("userEmail" , [])


  .controller(controller.UID, controller)
  .directive("userEmail", directive)
  .name;
