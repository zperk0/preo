export default function promotionTabs(BroadcastEvents, VenueService, EventService){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      promotion:"=",
    },
    template: require("./promotionTabs.tpl.html"),
    replace:true,
    require:'^contextualMenu',
    link: (scope, el, attr, contextualMenuCtrl) => {
      scope.contextualMenuCtrl = contextualMenuCtrl;
      scope.selectedTabIndex = 0;

      scope.venue = VenueService.currentVenue;

      scope.hasBasicTabErrors = function(){
        var form = scope.contextualMenuCtrl.contextualForm;
        return form && form.$submitted &&
          (
            form.entityName.$invalid
            || (form.discountValue && form.discountValue.$invalid)
            || (form.discountValue2 && form.discountValue2.$invalid)
            || (form.promotionCode && form.promotionCode.$invalid)
          );
      }

      EventService.getLastWeekEvents().then((data)=>{
        scope.events = data.events;
      })

     scope.hasAdvancedTabErrors = function(){
        var form = scope.contextualMenuCtrl.contextualForm;
        return form && form.$submitted &&
          (
            (form.displayName && form.displayName.$invalid)
            || (form.startTime && form.startTime.$invalid)
            || (form.endTime && form.endTime.$invalid)
            || (form.startDate && form.startDate.$invalid)
            || (form.endDate && form.endDate.$invalid)
          );
      }

      scope.$on(BroadcastEvents.ON_CONTEXTUAL_FORM_SUBMITTED, () => {
        console.log("form submitted", scope.selectedTabIndex, scope.hasBasicTabErrors(), scope.hasAdvancedTabErrors())
        if (scope.selectedTabIndex === 1 && scope.hasBasicTabErrors() && !scope.hasAdvancedTabErrors()) {
          scope.selectedTabIndex = 0;
        } else if (scope.selectedTabIndex === 0 && scope.hasAdvancedTabErrors() && !scope.hasBasicTabErrors()){
          scope.selectedTabIndex = 1;
        }
      });

    }
  }
}