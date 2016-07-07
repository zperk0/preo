// Import Style
import './cardItemList.scss';


import angular from 'angular';

// Import internal modules
import controller from './cardItemList.controller';
import directive from './cardItemList.directive';


import cardItem from '../cardItem';


export default angular.module("cardItemList" , [cardItem])


  .controller(controller.UID, controller)
  .directive("cardItemList", directive)
  .name;
