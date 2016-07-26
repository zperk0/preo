// Import Style
import './toolbar.scss';

import angular from 'angular';

import services from '../../shared';

// Import internal modules
import controller from './toolbar.controller';
import directive from './toolbar.directive';
import userSelect from './userSelect';
import venueSelect from './venueSelect';
import pathSelected from '../pathSelected';

export default angular.module("toolbar" , [
  userSelect,
  venueSelect,
  pathSelected,
  services
])

  .controller(controller.UID, controller)
  .directive("toolbar", directive)
  .name;
