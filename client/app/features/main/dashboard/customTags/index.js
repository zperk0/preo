// Import internal modules
import controller from './customTags.controller';
import routes from './customTags.routes';

import myTags from './myTags';

angular.module("webapp.customTags" , [
  'ui.router',
  myTags,
  ])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
