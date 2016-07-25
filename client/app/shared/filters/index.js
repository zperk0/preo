import sanitize from './sanitize/sanitize.filter';
import debug from './debug/debug.filter';
import orderByPosition from './orderByPosition/orderByPosition.filter';

export default angular.module("filters" , [])
 .filter("sanitize", sanitize)
 .filter("debug", debug)
 .filter("orderByPosition", orderByPosition)
 .name;