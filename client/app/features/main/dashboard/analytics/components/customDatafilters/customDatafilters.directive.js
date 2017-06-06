import controller from './customDatafilters.controller';
export default function customDatafilters(){
  "ngInject";

  return {
    restrict: 'E',
    scope: {
      hasDaterange: '=?',
      hasReport: '=?',
      reportTypes: '=?',
      onFilter: '&',
      initialValues: '=?'
    },
    template: require("./customDatafilters.tpl.html"),
    replace:true,
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,
    link: (scope, el, attr, ctrl) => {

      var rootElem = el[0];
      var eventSelectContainer = null;
      var venueSelectContainer  = null;

      // When Md-Select-Menu contains values with long text, it will fill all available screen to show 100% of the text.
      // Here we dont want this...so to limit md-select-menu and truncate text being showed, need to set manually maxWidth
      scope.onOpenVenue = function(){
        if(!venueSelectContainer)
          venueSelectContainer = rootElem.querySelector('.venueselect');

        var parentVenue = rootElem.querySelector('.select-venue');
        venueSelectContainer.style.maxWidth = parentVenue.offsetWidth + 'px';
        venueSelectContainer.style.width = parentVenue.offsetWidth + 'px';
      }

      scope.onOpenEvent = function(){
        if(!eventSelectContainer){
          eventSelectContainer = rootElem.querySelector('.eventselect');
        }

        var parentEvent = rootElem.querySelector('.select-event');
        eventSelectContainer.style.maxWidth = (parentEvent.offsetWidth*2) + 'px';
        eventSelectContainer.style.width = (parentEvent.offsetWidth*2) + 'px';
      }
    }
  };
}
