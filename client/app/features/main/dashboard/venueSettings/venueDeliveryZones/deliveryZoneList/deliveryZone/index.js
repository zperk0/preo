// Import Style
import './deliveryZone.scss';


// Import internal modules
import controller from './deliveryZone.controller';
import directive from './deliveryZone.directive';

import cardItem from '../../../../../../../components/cardItem';



export default angular.module("deliveryZone" , [cardItem])


  .controller(controller.UID, controller)
  .directive("deliveryZone", directive)
  .name;
