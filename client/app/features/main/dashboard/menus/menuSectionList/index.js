// Import Style
import './menuSectionList.scss';


import angular from 'angular';

// Import internal modules
import controller from './menuSectionList.controller';
import directive from './menuSectionList.directive';
import menuSection from './menuSection'
import cardItemList from '../../../../../components/cardItemList'



export default angular.module("menuSectionList" , [menuSection, cardItemList])


  .controller(controller.UID, controller)
  .directive("menuSectionList", directive)
  .name;
