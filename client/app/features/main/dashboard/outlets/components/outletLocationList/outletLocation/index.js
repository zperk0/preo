// Import Style
import './outletLocation.scss';


import angular from 'angular';

// Import internal modules
import controller from './outletLocation.controller';
import directive from './outletLocation.directive';

import cardItem from '../../../../../../../components/cardItem';
import itemChips from '../../../../../../../components/itemChips';


export default angular.module("outletLocation" , [cardItem, itemChips])


  .controller(controller.UID, controller)
  .directive("outletLocation", directive)
  .name;
