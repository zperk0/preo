// Import Style
import './promotionsList.scss';


import angular from 'angular';

// Import internal modules
import controller from './promotionsList.controller';
import directive from './promotionsList.directive';

import cardItemList from '../../../../../components/cardItemList'
import promotion from './promotion';

export default angular.module("promotionsList" , [cardItemList, promotion])


  .controller(controller.UID, controller)
  .directive("promotionsList", directive)
  .name;
