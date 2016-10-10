export default function autoOpenCalendar() {
  "ngInject";

  const ENTER = 13;

  return {
    restrict: 'A',
    require: 'mdDatepicker',
    priority: -1,
    compile: _compile
  };

  function _compile(tElement) {

    tElement.find('input').attr('ng-click', 'ctrl.onClick($event)').next().remove();

    return function (scope, element, attrs, datePicker) {

      datePicker.onClick = (event) => {
        datePicker.openCalendarPane(event);
      };

      datePicker.ngInputElement.on('keypress', (event) => {
        if(event.keyCode === ENTER) {
          datePicker.openCalendarPane(event);
        }
      });
    };  	
  }
}
