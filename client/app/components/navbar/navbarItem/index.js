// Import Style
import './navbarItem.scss';

// Import internal modules
import directive from './navbarItem.directive';

export default angular.module("navbar-item" , [])

  .directive("navbarItem", directive)
  .name;
