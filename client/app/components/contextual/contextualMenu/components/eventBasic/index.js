// Import Style
import './eventBasic.scss';


// Import internal modules
import controller from './eventBasic.controller';
import directive from './eventBasic.directive';


export default angular.module("eventBasic" , [])

  .controller(controller.UID, controller)
  .directive("eventBasic", directive)
  .name;
