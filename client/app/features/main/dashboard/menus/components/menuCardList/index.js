// Import Style
import './menuCardList.scss';


import angular from 'angular';

// Import internal modules
import controller from './menuCardList.controller';
import directive from './menuCardList.directive';

import menuCardItem from './menuCardItem'
import cardItemList from '../../../../../../components/cardItemList'

export default angular.module("menuCardList" , [cardItemList, menuCardItem])


  .controller(controller.UID, controller)
  .directive("menuCardList", directive)
  .name;
