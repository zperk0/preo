// Import Style
import './externalEventList.scss';


// Import internal modules
import controller from './externalEventList.controller';
import directive from './externalEventList.directive';


export default angular.module("externalEventList" , [])

  .controller(controller.UID, controller)
  .directive("externalEventList", directive)
  .name;
