// Import Style
import './cardItemActions.scss';


import angular from 'angular';

// Import internal modules
import directive from './cardItemActions.directive';


export default angular.module("cardItemActions" , [])

  .directive("cardItemActions", directive)
  .name;
