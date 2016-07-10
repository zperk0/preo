// Import Style
import './cardItemNew.scss';


import angular from 'angular';

// Import internal modules
import directive from './cardItemNew.directive';


export default angular.module("cardItemNew" , [])

  .directive("cardItemNew", directive)
  .name;
