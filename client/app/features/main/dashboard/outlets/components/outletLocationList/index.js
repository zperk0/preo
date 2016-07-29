// Import Style
import './outletLocationList.scss';


import angular from 'angular';

// Import internal modules
import controller from './outletLocationList.controller';
import directive from './outletLocationList.directive';

import cardItemList from '../../../../../../components/cardItemList'


export default angular.module("outletLocationList" , [cardItemList])


  .controller(controller.UID, controller)
  .directive("outletLocationList", directive)
  .name;
