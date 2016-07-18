import controller from './menuItem.controller';

export default function menuItem($timeout){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      item:"=",
      sectionId:"=?"
    },
    template: require("./menuItem.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    replace:true,
    require:["^cardItemList", "^menuItemList", "menuItem"],
    link: (scope, el, attr, ctrls) => {
      console.log("item index ", scope.$index);
      ctrls[2].menuItemListCtrl = ctrls[1]
      ctrls[2].cardItemList = ctrls[0]
      // console.log("scope", scope)
      // if (scope.$last){
      //   console.log("is last");
      //   $timeout(()=>{
      //     menuItemList.repeatReady();
      //   })
      // }

      // el.on('webkitTransitionEnd transitionend oTransitionEnd webkitTransitionEnd',(e)=>{
      //   console.log("transition end", el, e.propertyName, el.prop('offsetHeight'));
      //   el[0].style.minHeight = el.prop('offsetHeight')+'px';
      // })
    }
  };
}
