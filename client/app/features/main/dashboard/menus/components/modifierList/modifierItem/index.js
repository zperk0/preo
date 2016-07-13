// Import Style
import './modifierItem.scss';


import angular from 'angular';

// Import internal modules
import controller from './modifierItem.controller';
import directive from './modifierItem.directive';


import cardItem from '../../../../../../../components/cardItem';



export default angular.module("modifierItem" , [cardItem])


  .controller(controller.UID, controller)
  .directive("modifierItem", directive)
  .name;
