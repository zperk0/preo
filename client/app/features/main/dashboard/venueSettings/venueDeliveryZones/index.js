// Import Style
import './venueDeliveryZones.scss';

// Import internal modules
import controller from './venueDeliveryZones.controller';
import routes from './venueDeliveryZones.routes';
import deliveryZoneList from './deliveryZoneList';

export default angular.module("venueDeliveryZones" , ['ui.router',deliveryZoneList])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
