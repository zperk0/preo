export default function sanitize($sce){
  "ngInject";

 return function(val) {
    return $sce.trustAsResourceUrl(val);
 };
}