
import directive from './validHtml.directive';

export default angular.module("validHtml" , [])

  .directive("validHtml", directive)
  .name;
