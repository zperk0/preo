// Import Style
import './userInvite.scss';


// Import internal modules
import controller from './userInvite.controller';
import directive from './userInvite.directive';

import cardItem from '../../../../../../components/cardItem';
export default angular.module("userInvite" , [cardItem])


  .controller(controller.UID, controller)
  .directive("userInvite", directive)
  .name;
