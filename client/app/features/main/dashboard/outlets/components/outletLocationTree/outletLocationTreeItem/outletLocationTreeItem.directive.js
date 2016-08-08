export default function outletLocationTreeItem(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      outletLocation:"=",
      selected: '=?',
      onSelect: '&?'
    },
    template: require("./outletLocationTreeItem.tpl.html"),
    replace:true,
    // require:["^outletLocationGroup", 'outletLocationList'],
    link: (scope, el, attr, ctrls) => {
      
      scope.toggleExpand = _toggleExpand;
      scope.selectItem = _selectItem;
      scope.isSelected = _isSelected;

      function _toggleExpand() {

        scope.outletLocation.$expanded = !!!scope.outletLocation.$expanded;
      }

      function _selectItem($event) {

        if ($event.srcElement.parentElement.className.indexOf('material-icons') !== -1) {
          return false;
        }
        
        scope.onSelect && scope.onSelect({
          outletLocation: scope.outletLocation
        });
      }

      function _isSelected() {

        return scope.selected && scope.selected.id === scope.outletLocation.id;
      }
    }
  }
}
