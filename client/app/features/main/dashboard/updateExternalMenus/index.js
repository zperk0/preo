// Import Style
import './updateExternalMenus.scss';


import venueList from './venueList'

// Import internal modules
import controller from './updateExternalMenus.controller';
import routes from './updateExternalMenus.routes';

angular.module("webapp.updateExternalMenus" , ['ui.router', venueList])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
