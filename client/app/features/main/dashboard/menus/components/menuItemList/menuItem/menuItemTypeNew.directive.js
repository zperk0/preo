
export default function menuItemTypeNew(FeatureService, gettextCatalog){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      onClick: "&"
    },
    template: require("./menuItemTypeNew.tpl.html"),
    replace:true,
    link: (scope, el, attr, ctrls) => {

      let items = [{
        name: gettextCatalog.getString('Add new item'),
        type: 'MENU'
      }];

      if (FeatureService.hasVoucherFeature()) {
        items.push({
          name: gettextCatalog.getString('Add new voucher'),
          type: 'VOUCHER'
        });
      }

      scope.itemTypes = items;

      scope.handleClick = ($event,$mdOpenMenu) => {
        if (items.length > 1){
          $mdOpenMenu()
        } else{
          scope.onClick({$event:$event, type: 'MENU'});
        }
      }
    }
  };
}
