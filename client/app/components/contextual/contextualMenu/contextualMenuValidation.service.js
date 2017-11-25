export default class ContextualMenuValidationService {

  static get UID() {

    return "ContextualMenuValidationService";
  }

  /*Collection Slot contextual*/
  hasSlotBasicTabErrors (contextualForm, entity) {

    return  contextualForm
            && contextualForm.$submitted
            &&
            (
              contextualForm.entityName.$invalid
              || contextualForm.entityDisplayName.$invalid
              || contextualForm.entityEnd.$invalid
              || contextualForm.entityLeadTime.$invalid
            );
  }

  /*Collection Slot contextual*/
  hasSlotAdvancedTabErrors (contextualForm, entity) {

    return  contextualForm
            && contextualForm.$submitted
            &&
            (
              contextualForm.entityStart.$invalid
              || (entity.$hasSteps && contextualForm.entityStep.$invalid)
            );
  }

  /*Manager user contextual*/
  hasUserTabErrors (contextualForm, entity) {

    return  contextualForm
            && contextualForm.$submitted
            &&
            (
              contextualForm.entityName.$invalid
              || contextualForm.entityEmail.$invalid
            );
  }

  /*Manager user contextual*/
  hasUserVenuesTabErrors (contextualForm, entity) {

    const hasError = contextualForm
            && contextualForm.$submitted
            &&
            (
              !entity.venueIds.length &&
              entity.groupIds.length &&
              !entity.channelId
            );

    if(hasError && contextualForm)
      contextualForm.$valid = false;

    return hasError;
  }

  constructor() {
    "ngInject";
  }
}