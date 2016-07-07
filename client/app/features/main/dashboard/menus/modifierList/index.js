// Import Style
import './modifierList.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './modifierList.controller';
import routes from './modifierList.routes';

import '../../../../../components/cardItemList';


export default angular.module("modifierList" , [uirouter])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
