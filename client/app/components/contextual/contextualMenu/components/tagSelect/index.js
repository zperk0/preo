// Import styles
import "./tagSelect.scss";

// Import internal modules
import controller from './tagSelect.controller';
import directive from './tagSelect.directive';


export default angular.module("tagSelect" , [])

  .controller(controller.UID, controller)
  .directive("tagSelect", directive)
  .name;
