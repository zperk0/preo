// Import Style
import './itemChip.scss';


// Import internal modules
import controller from './itemChip.controller';
import directive from './itemChip.directive';



export default angular.module("itemChip" , [])


  .controller(controller.UID, controller)
  .directive("itemChip", directive)
  .name;
