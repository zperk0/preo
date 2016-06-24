import sanitize from './sanitize.filter';

export default angular.module("filters" , [])
 .filter("sanitize", sanitize)
 .name;