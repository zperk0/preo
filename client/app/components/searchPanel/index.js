// Import Style
import './searchPanel.scss';


// Import internal modules
import controller from './searchPanel.controller';
import directive from './searchPanel.directive';

export default angular.module("searchPanel" , [])
  .controller(controller.UID, controller)
  .directive("searchPanel", directive)
  .name;


