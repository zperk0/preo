// Import Style
import './venueSettings.scss';
import '../../../../../../node_modules/leaflet/dist/leaflet.css';
import '../../../../../../node_modules/leaflet-draw/dist/leaflet.draw.css';



import VenueDetails from './venueDetails';
import VenueLocation from './venueLocation';
import VenueServices from './venueServices';
import VenueDeliveryZones from './venueDeliveryZones';
import VenueOpeningHours from './venueOpeningHours';

// Import internal modules
import controller from './venueSettings.controller';
import routes from './venueSettings.routes';
import mdMap from '../../../../components/mdMap';
import leafletMap from '../../../../../../node_modules/leaflet/dist/leaflet.js';
import leafletDraw from '../../../../../../node_modules/leaflet-draw/dist/leaflet.draw.js';

angular.module("webapp.venueSettings" , ['ui.router', VenueDetails, VenueLocation, VenueServices, VenueDeliveryZones, VenueOpeningHours, mdMap])
    .config(routes)
    .controller(controller.UID, controller)
    .name;
