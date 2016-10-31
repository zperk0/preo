// Import Style
import './collectionSlots.scss';

import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './collectionSlots.controller';
import routes from './collectionSlots.routes';


export default angular.module("collectionSlots" , [uirouter])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
