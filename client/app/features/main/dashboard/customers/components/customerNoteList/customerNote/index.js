
import './customerNote.scss';

// Import internal modules
import controller from './customerNote.controller';
import directive from './customerNote.directive';

export default angular.module("customerNote" , [])
  .controller(controller.UID, controller)
  .directive("customerNote", directive)
  .name;
