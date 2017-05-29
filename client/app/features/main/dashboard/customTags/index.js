// Import internal modules
import controller from './customTags.controller';
import routes from './customTags.routes';

import myTags from './myTags';

import customTagList from './components/customTagList';

angular.module("webapp.customTags" , [
  'ui.router',
  myTags,
  customTagList,
  ])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
