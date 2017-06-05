
export default function eventNew(FeatureService, gettextCatalog){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      onClick: "&"
    },
    template: require("./eventNew.tpl.html"),
    replace:true,
    link: (scope, el, attr, ctrls) => {

     var options = [
       {
        name: gettextCatalog.getString('Create new event'),
        type: 'NEW'
       },
       {
        name: gettextCatalog.getString('Import Ticket Master event'),
        type: 'IMPORT'
       }
     ];

     var hasTMEventFeature = FeatureService.hasTicketMasterEventFeature();

     scope.handleClick = ($event,$mdOpenMenu) => {
       if (hasTMEventFeature){
         scope.menuEventTypes = options;
         $mdOpenMenu();
       } else{
         scope.onClick({$event:$event, type: 'NEW'});
       }
     }
    }
  };
}
