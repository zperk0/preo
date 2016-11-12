// Import Style
import './userCard.scss';


// Import internal modules
import controller from './userCard.controller';
import directive from './userCard.directive';



export default angular.module("userCard" , [])


  .controller(controller.UID, controller)
  .directive("userCard", directive)
  .name;
