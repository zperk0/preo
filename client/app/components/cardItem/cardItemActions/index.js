// Import Style
import './cardItemActions.scss';


// Import internal modules
import directive from './cardItemActions.directive';
import controller from './cardItemActions.controller';


export default angular.module("cardItemActions" , [])

  .directive("cardItemActions", directive)
  .controller(controller.UID, controller)
  .name;
