export default function outletLocationTreeItem(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      outletLocation:"=",
    },
    template: require("./outletLocationTreeItem.tpl.html"),
    replace:true,
    // require:["^outletLocationGroup", 'outletLocationList'],
    link: (scope, el, attr, ctrls) => {
      
      scope.toggleExpand = _toggleExpand;

      function _toggleExpand() {

        scope.outletLocation.$expanded = !!!scope.outletLocation.$expanded;
      }
    }
  }
}
