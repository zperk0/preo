// Import Style
import './analyticsSummary.scss';

// Import internal modules
import controller from './analyticsSummary.controller';
import routes from './analyticsSummary.routes';

export default angular.module("analyticsSummary" , [])
  .config(routes)
  .controller(controller.UID, controller) 
  .name;
