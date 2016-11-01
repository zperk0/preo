// Import Style
import './venueSettings.scss';



import VenueDetails from './venueDetails';
import VenueLocation from './venueLocation';

// Import internal modules
import controller from './venueSettings.controller';
import routes from './venueSettings.routes';
import mdMap from '../../../../components/mdMap';

  angular.module("webapp.venueSettings" , ['ui.router', VenueDetails, VenueLocation, mdMap])
    .config(routes)
    .controller(controller.UID, controller)
    .name;
