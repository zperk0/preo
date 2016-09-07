export default class contextualMenuController {
  static get UID(){
    return "contextualMenuController";
  }

  //restore original state if user cancels
  onCancel(){
    console.log("cancel and reject")
    this.contextualMenu.reject();
  }

  doSubmit(){
    if (this.contextualForm.$valid){
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

  constructor($scope, $stateParams, UtilsService, contextualMenu, MenuService, $timeout) {
    "ngInject";
    console.log("Showing conextual menu ", this.entity, this.type);
    this.$timeout = $timeout;
    this.$stateParams = $stateParams;
    this.UtilsService = UtilsService;
    this.originalEntity = angular.copy(this.entity);
    this.contextualMenu = contextualMenu;
    this.MenuService = MenuService;
  }
}
