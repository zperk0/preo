// Import Style
import './toolbar.scss';

import services from '../../shared';

// Import internal modules
import controller from './toolbar.controller';
import directive from './toolbar.directive';
import userSelect from './userSelect';
import venueSelect from './venueSelect';
import venueModeSelect from './venueModeSelect';
import pathSelected from '../pathSelected';

export default angular.module("toolbar" , [
  userSelect,
  venueModeSelect,
  venueSelect,
  pathSelected,
  services
])

  .controller(controller.UID, controller)
  .directive("toolbar", directive)
  .name;
