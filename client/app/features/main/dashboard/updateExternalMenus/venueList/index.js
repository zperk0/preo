// Import Style
import './venueList.scss';


import angular from 'angular';

// Import internal modules
import controller from './venueList.controller';
import directive from './venueList.directive';

import cardItemList from 'app/components/cardItemList'
import venueItem from './venueItem';

export default angular.module("venueList" , [cardItemList, venueItem])


  .controller(controller.UID, controller)
  .directive("venueList", directive)
  .name;
