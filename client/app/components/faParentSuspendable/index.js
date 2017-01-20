
import './faParentSuspendable.scss';

import directive from './faParentSuspendable.directive';

export default angular.module("faParentSuspendable" , [])

  .directive("faParentSuspendable", directive)
  .name;
