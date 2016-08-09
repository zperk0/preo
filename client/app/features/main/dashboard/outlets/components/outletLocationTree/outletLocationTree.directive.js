
export default function outletLocationTree(gettextCatalog){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      outletLocations:"=",
      selected: '=?',
      onSelectItem: '&?',
      allowSelectGroup: '@?'
    },
    template: require("./outletLocationTree.tpl.html"),
    replace:true,
    link: (scope, el, attr, ctrls) => {

      scope.allowSelectGroup = attr.allowSelectGroup === 'true';

      scope.getGroupName = _getGroupName;
      scope.selectGroup = _selectGroup;
      scope.isSelected = _isSelected;

      function _getGroupName() {

        if (scope.outletLocations && scope.outletLocations.length) {
          return scope.outletLocations[0].getGroup().label || gettextCatalog.getString('Location label');
        }

        return 'Location label';
      }

      function _selectGroup() {

        if (scope.allowSelectGroup) {
          scope.onSelectItem && scope.onSelectItem({
            outletLocation: angular.extend(scope.outletLocations[0].getGroup(), {
              isGroup: true
            })
          });          
        }
      }

      function _isSelected() {

        return scope.allowSelectGroup && scope.selected && scope.selected.isGroup;
      }
    }
  }
}
