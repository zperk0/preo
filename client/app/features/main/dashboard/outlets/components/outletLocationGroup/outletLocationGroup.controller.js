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

      this.outletLocationGroup.$expanded = true;
      this.contextualMenu.hide();

      // if (!this.outletLocationGroup.id){
      //   // this.outletLocationListCtrl.createOutletLocation(this.outletLocationGroup)
      //   //   .then((_outletLocation)=>{
      //   //     this.contextualMenu.hide();
      //   //     this.Snack.show('Outlet location created');
      //   //   }, (err)=>{
      //   //     console.log('error on save outlet location', err);
      //   //     this.Snack.showError('Error saving outlet location');
      //   //   })
      //   this.contextualMenu.hide();
      // } else {
      //   // this.updateOutletLocation().then(()=>{
      //   //   this.contextualMenu.hide();
      //   //   this.outletLocationGroup.$selected = false;
      //   // })

      //   this.contextualMenu.hide();
      // }
    }
  }  

  onEdit ($event) {

    this.originalOutletGroupLocation  = angular.copy(this.outletLocationGroup);
    this.contextual.showMenu(this.type, this.outletLocationGroup, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
    $event.stopPropagation();
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

    if (this.outletLocationGroup.label) {
    	this.outletLocationGroup.$expanded = true;
    } else {
    	this.outletLocationGroup.$expanded = false;
    }

  	if (!this.outletLocationGroup.$expanded) {
	    this.originalOutletGroupLocation  = angular.copy(this.outletLocationGroup);
	    this.contextual.showMenu(this.type, this.outletLocationGroup, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
  	}    
  }

  /* @ngInject */
  constructor($scope, $state, $stateParams, contextual, contextualMenu) {
    this.contextualMenu = contextualMenu;
    this.contextual = contextual;
    this.$scope = $scope;
    this.$state = $state;
    this.$stateParams = $stateParams;

    this.type = 'outletLocationGroup'; //type for contextual menu

    this.checkExpanded();
  }
}
