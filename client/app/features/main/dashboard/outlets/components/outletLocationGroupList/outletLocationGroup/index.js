// Import Style
import './outletLocationGroup.scss';


import angular from 'angular';

// Import internal modules
import controller from './outletLocationGroup.controller';
import directive from './outletLocationGroup.directive';

import cardItem from '../../../../../../../components/cardItem';


export default angular.module("outletLocationGroup" , [cardItem])


  .controller(controller.UID, controller)
  .directive("outletLocationGroup", directive)
  .name;
