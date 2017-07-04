// Import Style
import './customTags.scss';

// Import internal modules
import controller from './customTags.controller';
import routes from './customTags.routes';

import myTags from './myTags';
import tagActions from './tagActions';

import customTagList from './components/customTagList';
import tagActionList from './components/tagActionList';

angular.module("webapp.customTags" , [
  'ui.router',
  myTags,
  customTagList,
  tagActions,
  tagActionList
  ])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
