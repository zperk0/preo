// Import Style
import './publishVenues.scss';


// Import internal modules
import controller from './publishVenues.controller';
import directive from './publishVenues.directive';

export default angular.module("publishVenues" , [])
  .controller(controller.UID, controller)
  .directive("publishVenues", directive)
  .name;


