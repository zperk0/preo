// Import Style
import './breadcrumb.scss';


import angular from 'angular';

// Import internal modules
import directive from './breadcrumb.directive';

export default angular.module("breadcrumb" , [])

  .directive("breadcrumb", directive)
  .name;
