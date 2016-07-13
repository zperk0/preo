// Import Style
import './menuSection.scss';


import angular from 'angular';

// Import internal modules
import controller from './menuSection.controller';
import directive from './menuSection.directive';
import directiveNew from './menuSectionNew.directive';

import cardItem from '../../../../../../components/cardItem';
import itemList from '../../components/menuItemList';


export default angular.module("menuSection" , [cardItem, itemList])


  .controller(controller.UID, controller)
  .directive("menuSection", directive)
  .directive("menuSectionNew", directiveNew)
  .name;
