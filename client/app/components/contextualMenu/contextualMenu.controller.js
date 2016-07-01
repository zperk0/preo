export default class contextualMenuController {
  static get UID(){
    return "contextualMenuController";
  }

  //restore original state if user cancels
  onCancel(){
    this.ContextualMenu.reject();
  }

  doSubmit(contextualForm){
    if (contextualForm.$valid){
      this.ContextualMenu.resolve(this.entity);
    }
  }

  getImage(){
    if (this.entity && this.entity.images && this.entity.images.length){
      var path = this.UtilsService.getImagePath(this.entity.images[0].image)
      return path;
    }
    return false;
  }

  constructor($scope, UtilsService, ContextualMenu, $timeout) {
    "ngInject";
    console.log("Showing conextual menu ", this.entity, this.type);
    this.$timeout = $timeout;
    this.UtilsService = UtilsService;
    this.originalEntity = angular.copy(this.entity);
    this.ContextualMenu = ContextualMenu;
  }
}
