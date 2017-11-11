// Import Style
import './promotions.scss';


// Import internal modules
import controller from './promotions.controller';
import usersController from './users/users.controller';
import routes from './promotions.routes';

import promotionsList from './promotionsList'

angular.module("webapp.promotions" , ['ui.router', promotionsList])
  .config(routes)
  .controller(controller.UID, controller)
  .controller(usersController.UID, usersController)
  .name;
