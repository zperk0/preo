export default class collectionSlotBasicController {
  static get UID(){
    return "collectionSlotBasicController"
  }

  hasObjectError (item) {

    return item && Object.keys(item).length > 0;
  }

  getEndFactor () {

    return this.collectionSlot.end < 0 || this.collectionSlot.end == null ? -1 : 1;
  }

  /* @ngInject */
  constructor($scope, BroadcastEvents, CollectionSlotsService) {
    'ngInject';

    this.collectionSlot.$endFactor = this.getEndFactor();
    this.collectionSlot.$end = this.collectionSlot.end != null ? Math.abs(this.collectionSlot.end) : '';

    // this is from contextualMenuController, when the form is submitted and is invalid.
    $scope.$on(BroadcastEvents.ON_CONTEXTUAL_FORM_SUBMITTED, () => {

      if (this.contextualForm.selectedTabIndex === 1 && CollectionSlotsService.hasBasicTabErrors(this.contextualForm, this.collectionSlot)) {
        this.contextualForm.selectedTabIndex = 0;
      }
    });
  }
}
