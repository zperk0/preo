import controller from './customDatafilters.controller';
export default function customDatafilters(){
  "ngInject";

  return {
    restrict: 'E',
    scope: {
      //onDaterange: '&?',
      //onReport: '&?',
      hasDaterange: '=?',      
      hasReport: '=?',
      reportTypes: '=?',
      onFilter: '&'
     // onEvent: '&?',
     // onVenue: '&',
      //onCustomermarketing: '&?'
    },
    template: require("./customDatafilters.tpl.html"),
    replace:true,
    controller: controller.UID,
    controllerAs: "vm",
    bindToController: true,   
    link: (scope, el, attr, ctrl) => {  
      
      var venueSelectContainer = el[0].querySelector('.md-select-menu-container');

      var parent = el[0].querySelector('.select-venue');    

      // When Md-Select-Menu contains values with long text, it will fill all available screen to show 100% of the text.
      // Here we dont want this...so to limit md-select-menu and truncate text being showed, need to set manually maxWidth
      scope.onOpen = function(){      
       
        venueSelectContainer.style.maxWidth = parent.offsetWidth + 'px';    
      }  
    }
  };
}
