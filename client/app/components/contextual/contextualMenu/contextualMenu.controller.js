export default class contextualMenuController {
  static get UID(){
    return "contextualMenuController";
  }

  //restore original state if user cancels
  doCancel(){
    console.log("cancel and reject")

    if (this.onCancel) {
      this.onCancel();
    } else {
      this.contextualMenu.reject();
    }
  }

  doSubmit(){
    if (this.contextualForm.$valid) {

      if (this.params && typeof this.params.onBeforeSuccess === 'function') {
        this.params.onBeforeSuccess.call(this);
      } else {
        this._complete();
      }

    } else {
      // this is to the child directive redirect to error tab for example.
      this.$scope.$broadcast(this.BroadcastEvents.ON_CONTEXTUAL_FORM_SUBMITTED);
    }
  }

  _complete() {
    if (this.onSuccess) {
      this.onSuccess({
        entity: this.entity
      });
    } else {
      this.contextualMenu.resolve(this.entity);
    }
  }

  getImage(){
    if (this.entity && this.entity.images && this.entity.images.length){
      var path = this.UtilsService.getImagePath(this.entity.images[0].image)
      return path;
    }
    return false;
  }

  isShowing(type) {

    return this.contextualMenu.type === type;
  }

  getButtonName() {

    if (this.params && this.params.doneButtonText) {
      if (typeof this.params.doneButtonText === 'function') {
        return this.params.doneButtonText.call(this);
      }

      return this.params.doneButtonText;
    }

    return this.gettextCatalog.getString('Done');
  }

  constructor($scope, $stateParams, UtilsService, contextualMenu, MenuService, FeatureService, ContextualMenuValidationService, ItemService, $timeout, BroadcastEvents, gettextCatalog) {
    "ngInject";
    console.log("Showing conextual menu ", this.entity, this.type);
    this.$scope = $scope;
    this.$timeout = $timeout;
    this.$stateParams = $stateParams;
    this.UtilsService = UtilsService;
    this.originalEntity = angular.copy(this.entity);
    this.contextualMenu = contextualMenu;
    this.MenuService = MenuService;
    this.FeatureService = FeatureService;
    this.ValidationService = ContextualMenuValidationService;
    this.ItemService = ItemService;
    this.BroadcastEvents = BroadcastEvents;
    this.gettextCatalog = gettextCatalog;
  }
}
