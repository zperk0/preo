// Import Style
import './user.scss';


// Import internal modules
import controller from './user.controller';
import directive from './user.directive';


import cardItem from '../../../../../../components/cardItem';
export default angular.module("user" , [cardItem])


  .controller(controller.UID, controller)
  .directive("user", directive)
  .name;
