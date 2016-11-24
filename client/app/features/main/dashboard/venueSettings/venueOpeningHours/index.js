// Import Style
import './venueOpeningHours.scss';

// Import internal modules
import controller from './venueOpeningHours.controller';
import routes from './venueOpeningHours.routes';

import openingHoursList from './components/openingHoursList';

// import services from '../../../../../shared/services';

export default angular.module("venueOpeningHours" , [
	'ui.router',
	openingHoursList,
])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
