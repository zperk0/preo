export default function icon(){
  "ngInject";
  return {
    restrict: 'E',
    template: require("./icon.tpl.html"),
    replace:true,
    transclude:true
  };
}
