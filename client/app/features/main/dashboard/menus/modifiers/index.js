// Import Style
import './modifiers.scss';


import angular from 'angular';
import uirouter from 'angular-ui-router';

// Import internal modules
import controller from './modifiers.controller';
import routes from './modifiers.routes';

import modifierList from '../components/modifierList';

export default angular.module("modifiers" , [uirouter, modifierList])
  .config(routes)
  .controller(controller.UID, controller)
  .name;
