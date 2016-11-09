
export default function navbarItem($mdMenu, gettextCatalog){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      item:"="
    },
    template: require("./navbarItem.tpl.html"),
    require:"^navbar",
    link: (scope, el, attr, navbarCtrl) => {
      scope.vm =navbarCtrl;

      scope.handleMouseOver = (item, $mdOpenMenu, $event) => {
        // must do this or when the user clicks in trap to hide menu the class is not hidden
        navbarCtrl.closeAllMenus();
        if(!navbarCtrl.$expanded && item.children){
          item.$menuOpen = true;
          $mdOpenMenu($event);
        }
      };
      scope.handleMouseLeave = (item, $mdOpenMenu, $event) => {
        if(!navbarCtrl.$expanded && item.children && item.$menuOpen){
          $mdMenu.hide();
          item.$menuOpen = false;
        }
      };

      scope.handleClick = (item, parent = false, $mdOpenMenu, $event) => {
        const _handleChildrenExpanded = () => {
          navbarCtrl.toggleExpanded(item);
        };
        const _handleChildrenCollapsed = () => {
          $mdOpenMenu($event);
        };

        if (item.external){
          navbarCtrl.openExternal(item.external);
          return
        }

        if (item.children){
          return navbarCtrl.$expanded ? _handleChildrenExpanded() : _handleChildrenCollapsed();
        }

        if (item.id){
          let prefix = navbarCtrl.DESTINATION_PREFIX;
          if (parent){
            prefix+= parent.id +".";
          }
          navbarCtrl.$state.go(prefix + (item.destination || item.id));
        }
      };

      scope.getItemMouseHoverText = _getItemMouseHoverText;

      function _getItemMouseHoverText(item) {

        return gettextCatalog.getString('Open {{ name }} interactions menu', {
          name: item.name
        });
      }
    }
  };
}
