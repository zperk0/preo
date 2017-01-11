
export default function menuCardNew(FeatureService, gettextCatalog){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      onClick: "&"
    },
    template: require("./menuCardNew.tpl.html"),
    replace:true,
    link: (scope, el, attr, ctrls) => {

      let menus = [{
        name: gettextCatalog.getString('Food and drink menu'),
        type: 'MENU'
      }];

      if (FeatureService.hasVoucherFeature()) {
        menus.push({
          name: gettextCatalog.getString('Voucher menu'),
          type: 'VOUCHER'
        });
      }

      scope.menuTypes = menus;

      scope.handleClick = ($event,$mdOpenMenu) => {
        if (menus.length > 1){
          $mdOpenMenu()
        } else{
          scope.onClick({$event:$event, type: 'MENU'});
        }
      }
    }
  };
}
