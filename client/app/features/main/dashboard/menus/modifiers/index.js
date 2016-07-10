// Import Style
import './modifiers.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './modifiers.controller';
import routes from './modifiers.routes';

import cardItemList from '../../../../../components/cardItemList';
import modifierItem from '../../../../../components/modifierItem';

export default angular.module("modifiers" , [uirouter, cardItemList, modifierItem])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
