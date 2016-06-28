import controller from './menuItemList.controller'

export default function menuItemList($animate, $timeout){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      items:"=",
      section:"=?"
    },
    template: require("./menuItemList.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    replace:true,
    link: (scope, el, attr, ctrl) => {
        //(children + new) * children height + margin + safety value. This doesn't really need to be exact.
        var maxHeight = (ctrl.items.length+1) * (48 + 16) + 200;
        $animate.on('enter', el,
         (element, phase) =>{
            $timeout(()=>{
              element.css({"max-height":maxHeight+"px"});
            })
         });
        $animate.on('leave', el,
         (element, phase) =>{
           element.css({"max-height":"0px"})
         });

    }
  }
}
