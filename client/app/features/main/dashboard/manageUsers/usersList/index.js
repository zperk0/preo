// Import Style
import './usersList.scss';


// Import internal modules
import controller from './usersList.controller';
import directive from './usersList.directive';

import user from './user';
import cardItemList from '../../../../../components/cardItemList'


export default angular.module("usersList" , [cardItemList, user])
  .controller(controller.UID, controller)
  .directive("usersList", directive)
  .name;
