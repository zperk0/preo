// Import Style
import './promotionComponents.scss';

// Import internal modules
import promotionDiscountValue from './promotionDiscountValue.directive';
import promotionApply from './promotionApply.directive';
import promotionDisplay from './promotionDisplay.directive';
import promotionEvents from './promotionEvents.directive';
import promotionServices from './promotionServices.directive';
import promotionTakeaways from './promotionTakeaways.directive';
import promotionUsage from './promotionUsage.directive';



export default angular.module("promotionComponents" , [])

  .directive("promotionDiscountValue", promotionDiscountValue)
  .directive("promotionApply", promotionApply)
  .directive("promotionDisplay", promotionDisplay)
  .directive("promotionEvents", promotionEvents)
  .directive("promotionServices", promotionServices)
  .directive("promotionTakeaways", promotionTakeaways)
  .directive("promotionUsage", promotionUsage)
  .name;
