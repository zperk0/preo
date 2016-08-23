
import directive from './validNumber.directive';

export default angular.module("validNumber" , [])

  .directive("validNumber", directive)
  .name;
