import controller from './menuItemList.controller'

//refactor to not need section
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
      svIsDropzone:"=?",
      svIsDropzoneDisabled:"=?"
    },
    template: require("./menuItemList.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    replace:true,
    link: (scope, el, attr, ctrl) => {
      ctrl.el = el;
      el[0].style.maxHeight = 0;
      console.log("el", ctrl.el);
      el.on('webkitTransitionEnd transitionend oTransitionEnd webkitTransitionEnd',(e)=>{
        if (e.propertyName === 'max-height'){
          $timeout(()=>{
            ctrl.section.$expanding = false;
          })
        }
      })
    }
  }
}
