export default class outletLocationGroupListController {
  static get UID(){
    return "outletLocationGroupListController"
  }

  showCreateOutletLocationGroup() {

    let isCreating = false;
    this.outletLocationGroups.forEach((s, index)=>{
      if (s.id === undefined){
        isCreating = true;
      }
    });
    if (isCreating){
      console.log("Not showing outlet location new, already showing")
      return;
    }

    this.outletLocationGroup = this.OutletLocationService.getRootGroup();

    this.outletLocationGroup.$fromList = true;

    this.outletLocationGroups.push(this.outletLocationGroup);
    
    this.contextual.showMenu(this.type, this.outletLocationGroup, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
  }

  contextualMenuCancel(){
    
    this.outletLocationGroup = null;
    this.outletLocationGroups = [];
  }

  contextualMenuSuccess(entity){
    if (this.outletLocationGroup && entity && entity.label){
      this.outletLocationGroup = entity;

      this.outletLocationGroup.$expanded = true;
      this.contextualMenu.hide();

      // this.outletLocationGroups.push(this.outletLocationGroup);
    }
  }

  constructor($timeout, $stateParams, $q, contextual, contextualMenu, Spinner, Snack, OutletLocationService) {
    "ngInject";
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.OutletLocationService = OutletLocationService;
    this.$q = $q;
    this.$timeout = $timeout;
    this.contextual = contextual;
    this.contextualMenu = contextualMenu;
    this.venueId = $stateParams.venueId;
    this.type = 'outletLocationGroup'; //type for contextual menu

    this.outletLocationGroups = [];

    console.log('outlet location group in list here', this.outletLocationGroup);

    if (this.outletLocationGroup) {
      this.outletLocationGroups.push(this.outletLocationGroup);
    }
  }
}
