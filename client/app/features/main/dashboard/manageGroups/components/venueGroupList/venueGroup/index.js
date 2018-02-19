// Import Style
import './venueGroup.scss';

// Controllers
import controller from './venueGroup.controller';

// Directives
import directive from './venueGroup.directive';

export default angular.module('venueGroup' , [])
  .controller(controller.UID, controller)
  .directive('venueGroup', directive)
  .name;
