// Import Style
import './outletList.scss';


import angular from 'angular';

// Import internal modules
import controller from './outletList.controller';
import directive from './outletList.directive';

import outlet from './outlet';

import cardItemList from '../../../../../../components/cardItemList'


export default angular.module("outletList" , [cardItemList, outlet])


  .controller(controller.UID, controller)
  .directive("outletList", directive)
  .name;
