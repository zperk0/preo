// Import Style
import './outletLocationTreeItem.scss';


// Import internal modules
import directive from './outletLocationTreeItem.directive';

export default angular.module("outletLocationTreeItem" , [])

  .directive("outletLocationTreeItem", directive)
  .name;
