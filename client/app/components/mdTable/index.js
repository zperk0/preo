// Import Style
import './mdTable.scss';


// Import internal modules
import directive from './mdTable.directive';
import controller from './mdTable.controller';
import dropdownActions from '../cardActions/dropdownActions';

export default angular.module("mdTable" , [dropdownActions])

  .directive("mdTable", directive)
  .controller(controller.UID, controller)
  .name;
