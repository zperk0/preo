export default function cardItemActions(){
  'ngInject';

  //will display item actions based on the callbacks set in cardItem.cardItemActions
  // ex: if you pass onClone clone action will be visible, if you don't it'll be hidden
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

      scope.onMouseLeave = ($event)=>{
        cardItemCtrl.toggleCardActions($event, false);
      }
    }
  };
}
