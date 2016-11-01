// Import Style
import './venueDetails.scss';

// Import internal modules
import controller from './venueDetails.controller';
import routes from './venueDetails.routes';

export default angular.module("venueDetails" , [])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
