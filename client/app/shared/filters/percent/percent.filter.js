export default function sanitize($filter){
  "ngInject";

 return function (input, decimals) {
    return $filter('number')(input * 100, decimals) + '%';
  };
}