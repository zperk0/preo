// Import Style
import './autoSave.scss';

import directive from './autoSave.directive';

export default angular.module("autoSave" , [])
  .directive("autoSave", directive)
  .name;
