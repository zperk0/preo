export default class outletLocationGroupController {
  static get UID(){
    return "outletLocationGroupController"
  }

  restoreOriginalValues(){
    if (this.originalOutletGroupLocation){
      angular.extend(this.outletLocationGroup, this.originalOutletGroupLocation)
      this.originalOutletGroupLocation = false;
    }
  }  

  contextualMenuCancel(){
    this.restoreOriginalValues();
    this.outletLocationGroup.$selected = false;
  }

  contextualMenuSuccess(entity){
    if (this.outletLocationGroup && entity){
      this.outletLocationGroup = entity;

      if (!this.outletLocationGroup.id){
        // this.outletLocationListCtrl.createOutletLocation(this.outletLocationGroup)
        //   .then((_outletLocation)=>{
        //     this.contextualMenu.hide();
        //     this.Snack.show('Outlet location created');
        //   }, (err)=>{
        //     console.log('error on save outlet location', err);
        //     this.Snack.showError('Error saving outlet location');
        //   })
        this.contextualMenu.hide();
      } else {
        // this.updateOutletLocation().then(()=>{
        //   this.contextualMenu.hide();
        //   this.outletLocationGroup.$selected = false;
        // })

        this.contextualMenu.hide();
      }
    }
  }  

  onEdit ($event) {

    this.originalOutletGroupLocation  = angular.copy(this.outletLocationGroup);
    this.contextual.showMenu(this.type, this.outletLocationGroup, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
    $event.stopPropagation();
  }  

  /* @ngInject */
  constructor($scope, contextual, contextualMenu) {
    this.contextualMenu = contextualMenu;
    this.contextual = contextual;
    this.$scope = $scope;

    this.type = 'outletLocationGroup'; //type for contextual menu
  }
}
