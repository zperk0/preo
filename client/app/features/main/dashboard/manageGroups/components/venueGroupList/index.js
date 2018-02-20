// Import Style
import './venueGroupList.scss';

// Controllers
import controller from './venueGroupList.controller';

// Directives
import directive from './venueGroupList.directive';
import venueGroup from './venueGroup';

export default angular.module('venueGroupList' , [venueGroup])
  .controller(controller.UID, controller)
  .directive('venueGroupList', directive)
  .name;
