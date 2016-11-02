// Import Style
import './venueSettings.scss';



import VenueDetails from './venueDetails';
import VenueLocation from './venueLocation';
import VenueServices from './venueServices';
import VenueDeliveryZones from './venueDeliveryZones';

// Import internal modules
import controller from './venueSettings.controller';
import routes from './venueSettings.routes';
import mdMap from '../../../../components/mdMap';

  angular.module("webapp.venueSettings" , ['ui.router', VenueDetails, VenueLocation, VenueServices, VenueDeliveryZones , mdMap])
    .config(routes)
    .controller(controller.UID, controller)
    .name;
