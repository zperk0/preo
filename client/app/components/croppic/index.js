// Import Style
import './croppic.scss';

import angular from 'angular';

// Import internal modules
import directive from './croppic.directive';
import changeDirective from './customOnChange.directive';

export default angular.module("croppic" , [])

  .directive("croppic", directive)
  .directive('customOnChange', changeDirective)
  .name;
