// Import Style
import './billingInfo.scss';

// Import internal modules
import directive from './billingInfo.directive';

export default angular.module("billingInfo" , [])

  .directive("billingInfo", directive)
  .name;
