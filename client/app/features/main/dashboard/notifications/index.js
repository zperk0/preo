// Import Style
import './notifications.scss';


// Import internal modules
import controller from './notifications.controller';
import routes from './notifications.routes';

import notificationsForm from './notificationsForm'

angular.module("webapp.notifications" , ['ui.router', notificationsForm])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
