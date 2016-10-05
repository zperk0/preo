// Import Style
import './fullSpinner.scss';


// Import internal modules
import directive from './fullSpinner.directive';
import spinner from '../spinner';

export default angular.module("fullSpinner" , [spinner])
  .directive("fullSpinner", directive)
  .name;
