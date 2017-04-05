import controller from './dropdownActions.controller';
export default function dropdownActions(){
  "ngInject";

  //will display item actions based on the callbacks set in cardItem.cardItemActions
  // ex: if you pass onClone clone action will be visible, if you don't it'll be hidden
  return {
    restrict: 'E',
    scope: {
      actionsList: '=',
      onActions: '&'
    },
    template: require("./dropdownActions.tpl.html"),
    replace:true,
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    //require:["dropdownAction"],
    link: (scope, el, attr, ctrls) => {

    //  scope.cardItem = ctrls[0];
    //  scope.onMouseLeave = ($event)=>{
    //    ctrls[0].toggleCardActions($event, false);
    //  }
    }
  };
}
