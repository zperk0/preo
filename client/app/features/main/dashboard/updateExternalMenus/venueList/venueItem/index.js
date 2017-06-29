// Import Style
import './venueItem.scss';


import angular from 'angular';

// Import internal modules
import controller from './venueItem.controller';
import directive from './venueItem.directive';

import cardItem from 'app/components/cardItem';

export default angular.module("venueItem" , [cardItem])


  .controller(controller.UID, controller)
  .directive("venueItem", directive)
  .name;
