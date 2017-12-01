import controller from './cardItemActions.controller';
export default function cardItemActions($parse){
  "ngInject";

  //will display item actions based on the callbacks set in cardItem.cardItemActions
  // ex: if you pass onClone clone action will be visible, if you don't it'll be hidden
  return {
    restrict: 'E',
    scope: {
      isVisible:"=",
      isPaused:"=?",
      isAdd:"=?",
      isAddCustomField:"=?",
      isAddUser:"=?",
      onClone:'&?',
      onDelete:'&?',
      onEdit:'&?',
      onVisibility:'&?',
      onPause:'&?',
      onMove:'&?',
      onAdd:'&?',
      onAddCustomField:'&?',
      onAddLocation:'&?',
      onSync:'&?',
      onAddUser: '&?',
      onNotes: '&?',
      onCart: '&?',
      onHistory: '&?',
      disableAdd:'=?',
      disableAddCustomField:'=?',
      visibleMessage:'@',
      invisibleMessage:'@',
      addMessage: '=?',
      onExternalEvents: '&?',
      addCustomFieldMessage: '=?',
      addLocationMessage: '=?',
      syncMessage: '=?'
    },
    template: require("./cardItemActions.tpl.html"),
    replace:true,
    controller: controller.UID,
    controllerAs: "cardItemActionsCtrl",
    bindToController: true,
    require:["^cardItem", "cardItemActions"],
    link: (scope, el, attrs, ctrls) => {

      scope.cardItem = ctrls[0];
      scope.onMouseLeave = ($event)=>{
        ctrls[0].toggleCardActions($event, false);
      }
    }
  };
}
