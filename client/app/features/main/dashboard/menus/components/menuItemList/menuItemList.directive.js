import controller from './menuItemList.controller'

export default function menuItemList($animate, $timeout){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      items:"=",
      hasNew:"=",
      animate:"=?",
      section:"=?",
      hasSearch:"=?",
      svDisabled:"=",
      svMultiSelect:"=?",
      svKeepInList:"=?",
      svIsDropzone:"=?"
    },
    template: require("./menuItemList.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    replace:true,
    link: (scope, el, attr, ctrl) => {
      ctrl.el = el;

      el.on('webkitTransitionEnd transitionend oTransitionEnd webkitTransitionEnd',(e)=>{
        if (e.propertyName === 'max-height'){
          ctrl.section.$expanding = false;
        }

      })


    }
  }
}
