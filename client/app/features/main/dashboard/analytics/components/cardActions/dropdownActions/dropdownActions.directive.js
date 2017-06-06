import controller from './dropdownActions.controller';
export default function dropdownActions(){
  "ngInject";

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
    link: (scope, el, attr, ctrls) => {
  
    }
  };
}
