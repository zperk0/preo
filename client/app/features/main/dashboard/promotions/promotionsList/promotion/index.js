// Import Style
import './promotion.scss';


import angular from 'angular';

// Import internal modules
import controller from './promotion.controller';
import directive from './promotion.directive';

import cardItem from '../../../../../../components/cardItem';

export default angular.module("promotion" , [cardItem])


  .controller(controller.UID, controller)
  .directive("promotion", directive)
  .name;
