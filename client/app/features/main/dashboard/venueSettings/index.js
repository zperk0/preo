// Import Style
import './venueSettings.scss';



// Import internal modules
import controller from './venueSettings.controller';
import routes from './venueSettings.routes';


  angular.module("webapp.venueSettings" , ['ui.router'])
    .config(routes)
    .controller(controller.UID, controller)
    .name;
