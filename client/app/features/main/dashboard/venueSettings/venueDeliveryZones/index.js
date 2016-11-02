// Import Style
import './venueDeliveryZones.scss';

// Import internal modules
import controller from './venueDeliveryZones.controller';
import routes from './venueDeliveryZones.routes';

export default angular.module("venueDeliveryZones" , ['ui.router'])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
