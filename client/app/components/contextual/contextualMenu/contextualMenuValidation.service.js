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

    let venues = null;
    let groups = null;
    let channel = null;
    if (entity) {
      venues = entity.venues ? entity.venues.filter(o => o.$selected == true) : null;
      groups = entity.venueGroups ? entity.venueGroups.filter(o => o.$selected == true) : null;
      channel = entity.channel ? entity.channel.$selected : null;
    }

    const hasError = contextualForm
            && contextualForm.$submitted
            &&
            (
              (venues.length < 1) &&
              (groups.length < 1) &&
              (!channel)
            );

    if(hasError && contextualForm)
      contextualForm.$valid = false;

    return hasError;
  }

  constructor() {
    "ngInject";
  }
}