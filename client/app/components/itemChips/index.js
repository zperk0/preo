// Import Style
import './itemChips.scss';


import angular from 'angular';

// Import internal modules
import controller from './itemChips.controller';
import directive from './itemChips.directive';

import itemChip from './itemChip';


export default angular.module("itemChips" , [itemChip])


  .controller(controller.UID, controller)
  .directive("itemChips", directive)
  .name;
