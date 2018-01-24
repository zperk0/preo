// Import Style
import './promotions.scss';


// Import internal modules
import controller from './promotions.controller';
import usersController from './users/users.controller';
import routes from './promotions.routes';

import promotionsList from './promotionsList'
import scrollToPromotion from './scrollToPromotion/scrollToPromotion.directive';

angular.module("webapp.promotions" , ['ui.router', promotionsList])
  .config(routes)
  .controller(controller.UID, controller)
  .controller(usersController.UID, usersController)
  .directive("scrollToPromotion", scrollToPromotion)
  .name;
