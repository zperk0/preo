import controller from './customDatafilters.controller';
export default function customDatafilters(){
  "ngInject";

  return {
    restrict: 'E',
    scope: {
      onDaterange: '&?',
      onReport: '&?',
      reportTypes: '=?',
      onEvent: '&?',
      onVenue: '&',
      onCustomermarketing: '&?'
    },
    template: require("./customDatafilters.tpl.html"),
    replace:true,
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    //require:["dropdownAction"],
    link: (scope, el, attr, ctrl) => {  

    //  scope.$watch("vm.datesRange", function(newValue, oldValue){
    //  console.log('watch datesrange', newValue, oldValue);
    //  });
    //  scope.cardItem = ctrls[0];
    //  scope.onMouseLeave = ($event)=>{
    //    ctrls[0].toggleCardActions($event, false);
    //  }
    }
  };
}
