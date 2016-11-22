// Import Style
import './venueOpeningHours.scss';

// Import internal modules
import controller from './venueOpeningHours.controller';
import routes from './venueOpeningHours.routes';

export default angular.module("venueOpeningHours" , [
	'ui.router'
])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
