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

    if (!this.outletLocationGroup.label && !this.outletLocationGroup.$fromList) {
      this.onDeletedCallback && this.onDeletedCallback();
    }
  }

  contextualMenuSuccess(entity){
    console.log('entity', entity, this.outletLocationGroup);
    if (this.outletLocationGroup && entity && entity.label){
      this.outletLocationGroup = entity;

      this.outletLocationGroup.$expanded = true;

      this.Spinner.show("outlet-location-group-update");

      this.outletLocationGroup.update()
        .then(() => {

          this.contextualMenu.hide();
          this.Spinner.hide("outlet-location-group-update");
        }, () => {

          this.Spinner.hide("outlet-location-group-update");
          this.Snack.showError('Failed to update the group');
        });
    }
  }  

  onEdit ($event) {

    this.originalOutletGroupLocation  = angular.copy(this.outletLocationGroup);
    this.contextual.showMenu(this.type, this.outletLocationGroup, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
    $event.stopPropagation();
  }  

  onDelete ($event) {

    this.DialogService.delete(this.LabelService.TITLE_DELETE_OUTLET_LOCATION_GROUP, this.LabelService.CONTENT_DELETE_OUTLET_LOCATION_GROUP)
      .then(()=>{

        this.Spinner.show("outlet-location-group-delete");
        this.outletLocationGroup.delete()
          .then(() => {

            this.$timeout(() => {

              this.Spinner.hide("outlet-location-group-delete");
              this.onDeletedCallback && this.onDeletedCallback();
            });
// console.log('success on delete', this.onDeletedCallback);
          }, (err) => {

            this.$timeout(() => {
// console.log('error on delete', err);
              this.Spinner.hide("outlet-location-group-delete");
              this.Snack.showError('Failed to delete the group');            
            });
          });
      });
  }

  changeGroup (newGroup) {
console.log('new group here', newGroup);
  	this.outletLocationGroup = newGroup;

  	this.redirectToGroup();
  }

  redirectToGroup () {

  	var urlToRedirect = this.outletLocationGroup.path.substring(1);
  	urlToRedirect = urlToRedirect.substring(0, urlToRedirect.length - 1);
console.log('going to', urlToRedirect);
  	this.$state.go('main.dashboard.outlets.location', {
  		outletLocation: urlToRedirect
  	});
  }

  checkExpanded() {
console.log('checking expanded', this.outletLocationGroup);
    if (this.outletLocationGroup.label || (this.outletLocationGroup.outletLocations && this.outletLocationGroup.outletLocations.length)) {
    	this.outletLocationGroup.$expanded = true;
    } else {
    	this.outletLocationGroup.$expanded = false;
    }

  	if (!this.outletLocationGroup.$expanded && !this.outletLocationGroup.$fromList) {
	    this.originalOutletGroupLocation  = angular.copy(this.outletLocationGroup);
	    this.contextual.showMenu(this.type, this.outletLocationGroup, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
  	}    
  }

  constructor($scope, $state, $stateParams, $timeout, Snack, Spinner, DialogService, LabelService, contextual, contextualMenu) {
    "ngInject";
    this.contextualMenu = contextualMenu;
    this.contextual = contextual;
    this.$scope = $scope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$timeout = $timeout;
    this.Snack = Snack;
    this.Spinner = Spinner;
    this.DialogService = DialogService;
    this.LabelService = LabelService;

    this.type = 'outletLocationGroup'; //type for contextual menu

    this.checkExpanded();
  }
}
