// Import Style
import './deliveryZoneList.scss';


// Import internal modules
import controller from './deliveryZoneList.controller';
import directive from './deliveryZoneList.directive';

import deliveryZone from './deliveryZone'
import cardItemList from '../../../../../../components/cardItemList'

export default angular.module("deliveryZoneList" , [cardItemList, deliveryZone])


  .controller(controller.UID, controller)
  .directive("deliveryZoneList", directive)
  .name;
