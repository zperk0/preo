import marketingFilter from './marketingFilter/marketingFilter.filter';
import datelocale from './datelocale/datelocale.filter';
import orderObj from './orderObj/orderObj.filter';

export default angular.module("analytics.filters" , [])
 .filter("marketingFilter", marketingFilter)
 .filter("datelocale", datelocale)
 .filter("orderObj",orderObj)
 .name;