// Import Style
import './menuCardItem.scss';


import angular from 'angular';

// Import internal modules
import controller from './menuCardItem.controller';
import directive from './menuCardItem.directive';

import cardItem from '../../../../../../../components/cardItem';


export default angular.module("menuCardItem" , [cardItem])


  .controller(controller.UID, controller)
  .directive("menuCardItem", directive)
  .name;
