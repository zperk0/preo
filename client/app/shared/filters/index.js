import sanitize from './sanitize/sanitize.filter';

export default angular.module("filters" , [])
 .filter("sanitize", sanitize)
 .name;