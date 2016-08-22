// Import Style
import './cardItem.scss';

// Import internal modules
import controller from './cardItem.controller';
import directive from './cardItem.directive';

import cardItemTitle from './cardItemTitle';
import cardItemActions from './cardItemActions';
import cardItemChild from './cardItemChild';
import cardItemNew from './cardItemNew';

export default angular.module("cardItem" , [cardItemTitle, cardItemActions, cardItemChild, cardItemNew])

  .controller(controller.UID, controller)
  .directive("cardItem", directive)
  .name;
