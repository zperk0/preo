// Import internal modules
import controller from './customerNoteList.controller';
import directive from './customerNoteList.directive';

import customerNote from './customerNote';


export default angular.module("customerNoteList" , [customerNote])


  .controller(controller.UID, controller)
  .directive("customerNoteList", directive)
  .name;
