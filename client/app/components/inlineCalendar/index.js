// Import Style
import './inlineCalendar.scss';


// Import internal modules
import directive from './inlineCalendar.directive';

export default angular.module("inlineCalendar" , [])
  .directive("inlineCalendar", directive)
  .name;
