// Import Style
import './cardItem.scss';


import angular from 'angular';

// Import internal modules
import controller from './cardItem.controller';
import directive from './cardItem.directive';

import cardItemTitle from './cardItemTitle';
import cardItemActions from './cardItemActions';

export default angular.module("cardItem" , [cardItemTitle, cardItemActions])

  .controller(controller.UID, controller)
  .directive("cardItem", directive)
  .name;
