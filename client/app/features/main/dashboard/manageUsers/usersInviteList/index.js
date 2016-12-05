// Import Style
import './usersInviteList.scss';


// Import internal modules
import controller from './usersInviteList.controller';
import directive from './usersInviteList.directive';

import userInvite from './userInvite';
import cardItemList from '../../../../../components/cardItemList'


export default angular.module("usersInviteList" , [cardItemList, userInvite])
  .controller(controller.UID, controller)
  .directive("usersInviteList", directive)
  .name;
