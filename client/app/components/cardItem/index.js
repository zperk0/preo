// Import Style
import './cardItem.scss';


import angular from 'angular';

// Import internal modules
import controller from './cardItem.controller';
import directive from './cardItem.directive';

import cardItemTitle from './cardItemTitle';
import cardItemActions from './cardItemActions';
import cardItemChild from './cardItemChild';

export default angular.module("cardItem" , [cardItemTitle, cardItemActions, cardItemChild])

  .controller(controller.UID, controller)
  .directive("cardItem", directive)
  .name;
