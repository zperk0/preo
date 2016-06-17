// Import Style
import './cardItemTitle.scss';


import angular from 'angular';

// Import internal modules
import directive from './cardItemTitle.directive';



export default angular.module("cardItemTitle" , [])

  .directive("cardItemTitle", directive)
  .name;
