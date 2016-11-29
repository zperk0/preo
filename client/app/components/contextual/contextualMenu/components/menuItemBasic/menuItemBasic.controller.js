export default class menuItemBasicController {
  static get UID(){
    return "menuItemBasicController"
  }

  /* @ngInject */
  constructor($scope, BroadcastEvents, ItemService) {
    'ngInject';


    $scope.$on(BroadcastEvents.ON_CONTEXTUAL_FORM_SUBMITTED, () => {
console.log('contextualForm submmited error', this.contextualForm.selectedTabIndex);
      if (this.contextualForm.selectedTabIndex === 1) {

        if (ItemService.hasBasicTabErrors(this.contextualForm, this.item)) {
          this.contextualForm.selectedTabIndex = 0;
        } else if (this.item.isVoucher() && ItemService.hasAdvancedTabErrors(this.contextualForm, this.item)) {
          this.contextualForm.selectedTabIndex = 2;
        }

        return;
      }

      if (this.contextualForm.selectedTabIndex === 0 && !ItemService.hasBasicTabErrors(this.contextualForm, this.item)) {
console.log('tab 0 here.', this.item.isVoucher(), ItemService.hasAdvancedTabErrors(this.contextualForm, this.item));
        if (this.item.isVoucher() && ItemService.hasAdvancedTabErrors(this.contextualForm, this.item)) {
          this.contextualForm.selectedTabIndex = 2;
        }

        return;
      }

      if (this.contextualForm.selectedTabIndex === 2 && !ItemService.hasAdvancedTabErrors(this.contextualForm, this.item)) {

        if (ItemService.hasBasicTabErrors(this.contextualForm, this.item)) {
          this.contextualForm.selectedTabIndex = 0;
        }

        return;
      }
    });
  }
}
