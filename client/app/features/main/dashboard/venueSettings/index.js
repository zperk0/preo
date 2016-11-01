// Import Style
import './venueSettings.scss';



import VenueDetails from './venueDetails';

// Import internal modules
import controller from './venueSettings.controller';
import routes from './venueSettings.routes';


  angular.module("webapp.venueSettings" , ['ui.router', VenueDetails])
    .config(routes)
    .controller(controller.UID, controller)
    .name;
