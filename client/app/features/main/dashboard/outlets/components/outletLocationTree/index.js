// Import Style
import './outletLocationTree.scss';


import angular from 'angular';

// Import internal modules
import directive from './outletLocationTree.directive';

import outletLocationTreeItem from './outletLocationTreeItem';

export default angular.module("outletLocationTree" , [outletLocationTreeItem])


  .directive("outletLocationTree", directive)
  .name;
