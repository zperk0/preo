import controller from './cardItemActions.controller';
export default function cardItemActions(){
  "ngInject";

  //will display item actions based on the callbacks set in cardItem.cardItemActions
  // ex: if you pass onClone clone action will be visible, if you don't it'll be hidden
  return {
    restrict: 'E',
    scope: {
      isVisible:"=",
      isPaused:"=?",
      onClone:'&?',
      onDelete:'&?',
      onEdit:'&?',
      onVisibility:'&?',
      onPause:'&?',
      onMove:'&?',
      onAdd:'&?',
      onAddLocation:'&?',
      disableAdd:'=?',
      visibleMessage:'@',
      invisibleMessage:'@',
      addMessage: '=?',
      addLocationMessage: '=?'
    },
    template: require("./cardItemActions.tpl.html"),
    replace:true,
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    require:["^cardItem", "cardItemActions"],
    link: (scope, el, attr, ctrls) => {
      scope.cardItem = ctrls[0];
      scope.onMouseLeave = ($event)=>{
        ctrls[0].toggleCardActions($event, false);
      }
    }
  };
}
