// Import Style
import './outletLocations.scss';



// Import internal modules
import controller from './outletLocations.controller';
import routes from './outletLocations.routes';

export default angular.module("outletLocations" , ['ui.router'])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
