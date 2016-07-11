import controller from './menuItemList.controller'

export default function menuItemList($animate, $timeout){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      items:"=",
      hasNew:"=",
      isDropzone:"=",
      svDisabled:"=?",
      svKeepInList:"=?",
      svMultiSelect:"=?",
      section:"=?",
      hasSearch:"=?"
    },
    template: require("./menuItemList.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    replace:true,
    link: (scope, el, attr, ctrl) => {
        //(children + new) * children height + margin + safety value. This doesn't really need to be exact.
        ctrl.element = el;
        $animate.on('enter', el,
         (element, phase) =>{
            $timeout(()=>{
              ctrl.setMaxHeight();
            })
         });
        $animate.on('leave', el,
         (element, phase) =>{
           element.css({"max-height":"0px"})
         });

    }
  }
}
