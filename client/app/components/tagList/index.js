// Import Style
import './tagList.scss';


// Import internal modules
import controller from './tagList.controller';
import directive from './tagList.directive';



export default angular.module("tagList" , [])


  .controller(controller.UID, controller)
  .directive("tagList", directive)
  .name;
