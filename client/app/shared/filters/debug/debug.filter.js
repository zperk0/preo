export default function debug($location){
  "ngInject";

 return function(val) {
    return $location.search().debug ? val : '';
 };
}