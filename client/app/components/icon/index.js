// Import Style

import angular from 'angular';

import directive from './icon.directive';

export default angular.module("icon" , [])
  .directive("icon", directive)
  .name;
