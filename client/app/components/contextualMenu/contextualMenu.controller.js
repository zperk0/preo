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

  fileChange(event){
    var reader = new FileReader();
    reader.onload = (evt) => {
      this.$timeout(()=>{
        this.inputImage = evt.target.result;
      });
    };
    reader.readAsDataURL(event.currentTarget.files[0]);
  }

  constructor($rootScope, BroadcastEvents, ContextualMenu, $timeout) {
    "ngInject";
    console.log("Showing conextual menu ", this.entity, this.type);
    this.$timeout = $timeout;
    this.originalEntity = angular.copy(this.entity);
    this.$rootScope = $rootScope;
    this.ContextualMenu = ContextualMenu;
    this.BroadcastEvents = BroadcastEvents;
  }
}
