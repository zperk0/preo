export default class contextualDrawerService {
  static get UID(){
    return "contextualDrawer";
  }

  isOpen(id){
    if (this.id === id){
      return true;
    }
    return false;
  }

  //remove
  clearLocationParam(){
    angular.forEach(this.$location.search(),(i,k)=>{
     if (k.indexOf("drawer") === 0){
        this.$location.search(k,null)
      }
    })
  }

  //same as close but doesn't call error callback
  close(){
    if (this.parentElement && this.parentElement.scope()) {
      this.parentElement.scope().$broadcast('$onSideNavClose');
    }

    if (this.id && this.$mdSidenav(this.id).isOpen()){
      this.$mdSidenav(this.id).close();
      this.id = false;
    }
    this.clearLocationParam();
    this.offWatchEspaceKey();
  }

  cancel(err){

    this.close();
    this.deferred && this.deferred.reject(err);
  }

  cancelWithoutClose(err){

    this.deferred && this.deferred.reject(err);
  }

  success(data){

    this.close();
    this.deferred && this.deferred.resolve(data);
  }

  successWithoutClose(data){

    this.deferred && this.deferred.resolve(data);
  }

  notify(data){

    this.deferred && this.deferred.notify(data);
  }

  //DO NOT CALL THIS METHOD DIRECTLY, use the contextual service;
  show(id){
    if (this.id){
      this.cancel();
    }
    this.id = id;

    this.deferred = this.$q.defer();

    this.sidenavElement = angular.element(document.querySelectorAll("md-sidenav[md-component-id='" + this.id + "']"));
    this.parentElement = this.sidenavElement.parent();

    this.sidenavElement.scope().$broadcast(this.BroadcastEvents.ON_CONTEXTUAL_DRAWER_OPEN, {id: this.id});

    this.$mdSidenav(id)
      .toggle()
      .then(function (argument) {

        console.log(arguments);
      }.bind(this));

    this.watchEspaceKey();

    return this.deferred.promise

  }

  watchEspaceKey () {

    if (!this.parentElement) {
      return;
    }

    this.parentElement['on']('keydown', this.onKeyDown.bind(this));
  }

  offWatchEspaceKey () {

    if (!this.parentElement) {
      return;
    }

    this.parentElement['off']('keydown', this.onKeyDown.bind(this));
  }

  onKeyDown (ev) {

    var isEscape = (ev.keyCode === this.$mdConstant.KEY_CODE.ESCAPE);

    if (isEscape) {
      this.cancel({
        isEscape: isEscape
      });
    }
  }

  constructor($compile, $rootScope, $q, $mdSidenav, BroadcastEvents, $mdConstant, $location) {
    "ngInject";
    this.$location = $location;
    this.$compile = $compile;
    this.$rootScope = $rootScope;
    this.$q = $q;
    this.$mdSidenav =$mdSidenav;
    this.$mdConstant =$mdConstant;
    this.BroadcastEvents = BroadcastEvents;

    this.deferred = null;

  }
}
