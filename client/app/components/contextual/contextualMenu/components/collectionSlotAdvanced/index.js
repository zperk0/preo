// Import Style
import './collectionSlotAdvanced.scss';


// Import internal modules
import controller from './collectionSlotAdvanced.controller';
import directive from './collectionSlotAdvanced.directive';


export default angular.module("collectionSlotAdvanced" , [])

  .controller(controller.UID, controller)
  .directive("collectionSlotAdvanced", directive)
  .name;
