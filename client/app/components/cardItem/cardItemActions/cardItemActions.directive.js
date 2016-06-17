export default function cardItemActions(){
  'ngInject';
  return {
    restrict: 'E',
    scope: {
      isVisible:"="
    },
    template: require("./cardItemActions.tpl.html"),
    replace:true,
    require:"^cardItem",
    link: (scope, el, attr, cardItemCtrl) => {
      scope.vm = cardItemCtrl;
    }
  };
}
