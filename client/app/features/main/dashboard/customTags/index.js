// Import internal modules
import controller from './customTags.controller';
import routes from './customTags.routes';

import customTagListView from './customTagList';

angular.module("webapp.customTags" , [
  'ui.router',
  customTagListView,
  ])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
