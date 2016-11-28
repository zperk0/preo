// Import Style
import './menuCardItem.scss';



// Import internal modules
import controller from './menuCardItem.controller';
import directive from './menuCardItem.directive';
import directiveNew from './menuCardNew.directive';

import cardItem from '../../../../../../../components/cardItem';


export default angular.module("menuCardItem" , [cardItem])


  .controller(controller.UID, controller)
  .directive("menuCardItem", directive)
  .directive("menuCardNew", directiveNew)
  .name;
