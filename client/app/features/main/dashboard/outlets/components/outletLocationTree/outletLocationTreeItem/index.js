// Import Style
import './outletLocationTreeItem.scss';


import angular from 'angular';

// Import internal modules
import directive from './outletLocationTreeItem.directive';

export default angular.module("outletLocationTreeItem" , [])

  .directive("outletLocationTreeItem", directive)
  .name;
