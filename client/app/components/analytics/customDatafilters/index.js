// Import Style
import './customDatafilters.scss';


// Import internal modules
import directive from './customDatafilters.directive';
import controller from './customDatafilters.controller';

export default angular.module("customDatafilters" , [])

  .directive("customDatafilters", directive)
  .controller(controller.UID, controller)
  .name;
