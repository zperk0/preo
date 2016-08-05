
export default function outletLocationTree(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      outletLocations:"=",
    },
    template: require("./outletLocationTree.tpl.html"),
    replace:true,
    // require:["^outletLocationGroup", 'outletLocationList'],
    link: (scope, el, attr, ctrls) => {
      
      if (scope.outletLocations && scope.outletLocations.length) {
        scope.group = scope.outletLocations[0].getGroup();
      }
    }
  }
}
