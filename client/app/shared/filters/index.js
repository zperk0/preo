import sanitize from './sanitize/sanitize.filter';
import debug from './debug/debug.filter';

export default angular.module("filters" , [])
 .filter("sanitize", sanitize)
 .filter("debug", debug)
 .name;