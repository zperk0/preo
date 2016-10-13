import controller from './menuSectionItemList.controller'

//refactor to not need section
export default function menuSectionItemList($animate, $timeout){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      items:"=",
      hasNew:"=",
      animate:"=?",
      section:"=?",
      hasSearch:"=?",
      searchText:"=?",
      svDisabled:"=",
      svMultiSelect:"=?",
      svKeepInList:"=?",
      svIsDropzone:"=?",
      svIsDropzoneDisabled:"=?",
      orderBy: '=?',
      orderByReverse: '=?',
    },
    template: require("./menuSectionItemList.tpl.html"),
    controller: controller.UID,
    controllerAs: "menuSectionItemListCtrl",
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
