
// Import internal modules
import controller from './customTag.controller';
import directive from './customTag.directive';



export default angular.module("customTag" , [])


  .controller(controller.UID, controller)
  .directive("customTag", directive)
  .name;
