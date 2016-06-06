// Import Style
import './toolbar.scss';

import angular from 'angular';

// Import internal modules
import controller from './toolbar.controller';
import directive from './toolbar.directive';
import icon from '../icon';
import userSelect from '../userSelect';
import venueSelect from '../venueSelect';
import pathSelected from '../pathSelected';

export default angular.module("toolbar" , [icon, userSelect, venueSelect, pathSelected])

  .controller(controller.UID, controller)
  .directive("toolbar", directive)
  .name;
