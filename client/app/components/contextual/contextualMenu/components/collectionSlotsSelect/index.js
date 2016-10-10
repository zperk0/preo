// Import Style
import './collectionSlotsSelect.scss';


// Import internal modules
import controller from './collectionSlotsSelect.controller';
import directive from './collectionSlotsSelect.directive';



export default angular.module("collectionSlotsSelect" , [])


  .controller(controller.UID, controller)
  .directive("collectionSlotsSelect", directive)
  .name;
