
// Import internal modules
import controller from './customerItem.controller';
import directive from './customerItem.directive';



export default angular.module("customerItem" , [])


  .controller(controller.UID, controller)
  .directive("customerItem", directive)
  .name;
