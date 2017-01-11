// Import Style
import './analytics.scss';


// Import internal modules
import controller from './analytics.controller';
import routes from './analytics.routes';

import iframeLoad from '../../../../components/iframeLoad';


export default angular.module("webapp.analytics" , ['ui.router', iframeLoad])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
