import './tagAction.scss';

// Import internal modules
import controller from './tagAction.controller';
import directive from './tagAction.directive';



export default angular.module("tagAction" , [])


  .controller(controller.UID, controller)
  .directive("tagAction", directive)
  .name;
