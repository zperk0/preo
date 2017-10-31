// Import Style
import './promotionDiscountValue/promotionDiscountValue.scss';
import './promotionApply/promotionApply.scss';
import './promotionCustomer/promotionCustomer.scss';
import './promotionDisplay/promotionDisplay.scss';
import './promotionDates/promotionDates.scss';
import './promotionEvents/promotionEvents.scss';
import './promotionServices/promotionServices.scss';
import './promotionPayments/promotionPayments.scss';
import './promotionUsage/promotionUsage.scss';

// Import internal modules
import promotionDiscountValue from './promotionDiscountValue/promotionDiscountValue.directive';
import promotionApply from './promotionApply/promotionApply.directive';
import promotionCustomer from './promotionCustomer/promotionCustomer.directive';
import promotionDisplay from './promotionDisplay/promotionDisplay.directive';
import promotionDates from './promotionDates/promotionDates.directive';
import promotionEvents from './promotionEvents/promotionEvents.directive';
import promotionServices from './promotionServices/promotionServices.directive';
import promotionPayments from './promotionPayments/promotionPayments.directive';
import promotionUsage from './promotionUsage/promotionUsage.directive';
import promotionTabs from './promotionTabs/promotionTabs.directive';



export default angular.module("promotionComponents" , [])

  .directive("promotionDiscountValue", promotionDiscountValue)
  .directive("promotionApply", promotionApply)
  .directive("promotionCustomer", promotionCustomer)
  .directive("promotionDisplay", promotionDisplay)
  .directive("promotionDates", promotionDates)
  .directive("promotionEvents", promotionEvents)
  .directive("promotionServices", promotionServices)
  .directive("promotionPayments", promotionPayments)
  .directive("promotionTabs", promotionTabs)
  .directive("promotionUsage", promotionUsage)
  .name;
