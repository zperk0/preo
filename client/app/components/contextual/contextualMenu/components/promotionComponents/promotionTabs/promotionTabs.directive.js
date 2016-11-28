export default function promotionTabs(BroadcastEvents){
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
      scope.selectedTabIndex = 1;

      scope.hasBasicTabErrors = function(){
        return false
      }

      scope.hasAdvancedTabErrors = function(){
        return false
      }

      scope.$on(BroadcastEvents.ON_CONTEXTUAL_FORM_SUBMITTED, () => {
        if (scope.selectedTabIndex === 1 && scope.hasBasicTabErrors() && !scope.hasAdvancedTabErrors()) {
          scope.selectedTabIndex = 0;
        } else if (scope.selectedTabIndex === 0 && scope.hasAdvancedTabErrors() && !scope.hasBasicTabErrors){
          scope.selectedTabIndex = 1;
        }
      });

    }
  }
}
