// Import Style
import './venueSettings.scss';



import VenueDetails from './venueDetails';
import VenueLocation from './venueLocation';
import VenueServices from './venueServices';
import VenueDeliveryZones from './venueDeliveryZones';
import VenueOpeningHours from './venueOpeningHours';

// Import internal modules
import controller from './venueSettings.controller';
import routes from './venueSettings.routes';
import mdMap from '../../../../components/mdMap';

  angular.module("webapp.venueSettings" , ['ui.router', VenueDetails, VenueLocation, VenueServices, VenueDeliveryZones, VenueOpeningHours, mdMap])
    .config(routes)
    .controller(controller.UID, controller)
    .name;
