// Import Style
import './outletLocationGroupList.scss';


import angular from 'angular';

// Import internal modules
import controller from './outletLocationGroupList.controller';
import directive from './outletLocationGroupList.directive';

import cardItemList from '../../../../../../components/cardItemList'


export default angular.module("outletLocationGroupList" , [cardItemList])


  .controller(controller.UID, controller)
  .directive("outletLocationGroupList", directive)
  .name;
