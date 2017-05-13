import controller from './customDatePicker.controller';

export default function customDatePicker(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {      
       datesRange: '=?'
    },
    template: require("./customDatePicker.tpl.html"),
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    replace:true,
    link: (scope, elem, attr, ctrl) => {

      scope.getDirectiveElement = function() {
        return elem;
      };

    //  ctrl.initCalendar();    
    }
  };
}
