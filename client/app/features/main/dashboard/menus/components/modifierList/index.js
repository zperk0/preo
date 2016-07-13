// Import Style
import './modifierList.scss';


import angular from 'angular';

// Import internal modules
import controller from './modifierList.controller';
import directive from './modifierList.directive';

import modifierItem from './modifierItem'
import cardItemList from '../../../../../../components/cardItemList'


export default angular.module("modifierList" , [modifierItem, cardItemList])


  .controller(controller.UID, controller)
  .directive("modifierList", directive)
  .name;
