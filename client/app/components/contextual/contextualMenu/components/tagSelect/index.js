// Import styles
import "./tagSelect.scss";

// Import internal modules
import controller from './tagSelect.controller';
import directive from './tagSelect.directive';
import mdChips from './mdChips';

export default angular.module("tagSelect" , [])

  .controller(controller.UID, controller)
  .directive("mdChips", mdChips)
  .directive("tagSelect", directive)
  .name;
