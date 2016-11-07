import sanitize from './sanitize/sanitize.filter';
import debug from './debug/debug.filter';
import percent from './percent/percent.filter';
import currency from './currency/currency.filter';

export default angular.module("filters" , [])
 .filter("sanitize", sanitize)
 .filter("debug", debug)
 .filter("percent", percent)
 .filter("currency", currency)
 .name;