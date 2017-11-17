// Import Style
import './analyticsPromotions.scss';

// Import internal modules
import controller from './analyticsPromotions.controller';
import routes from './analyticsPromotions.routes';
export default angular.module("analyticsPromotions" , [])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
