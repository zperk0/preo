export default class contextualMenuController {
  static get UID(){
    return "contextualMenuController";
  }

  //restore original state if user cancels
  onCancel(){
    this.$rootScope.$broadcast(this.BroadcastEvents._ON_CLOSE_CONTEXTUAL_MENU_CANCEL);
  }

  doSubmit(contextualForm){
    if (contextualForm.$valid){
      this.onSubmit().then((response)=>{
        this.$rootScope.$broadcast(this.BroadcastEvents._ON_CLOSE_CONTEXTUAL_MENU_SUCCESS);
      }, (err)=>{
        console.log("Contextual submit failed", err);
      });
    }
  }


  constructor($rootScope, BroadcastEvents) {
    "ngInject";
    console.log("Showing conextual menu ", this.entity, this.type);
    this.originalEntity = angular.copy(this.entity);
    this.$rootScope = $rootScope;
    this.BroadcastEvents = BroadcastEvents;
  }
}
