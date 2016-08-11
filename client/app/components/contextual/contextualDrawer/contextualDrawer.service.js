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
    if (this.id){
      this.$mdSidenav(this.id).close();
      this.id = false;
    }
    this.clearLocationParam();
  }

  cancel(err){

    this.close();
    this.deferred && this.deferred.reject(err);
  }

  success(data){

    this.close();
    this.deferred && this.deferred.resolve(data);
  }

  //DO NOT CALL THIS METHOD DIRECTLY, use the contextual service;
  show(id){
    if (this.id){
      this.cancel();
    }

    this.deferred = this.$q.defer();

    this.id = id;
    this.$mdSidenav(id)
      .toggle()
      .then(function (argument) {

        console.log(arguments);
      })

    return this.deferred.promise

  }

  constructor($compile, $rootScope, $q, $mdSidenav, $location) {
    "ngInject";
    this.$location = $location;
    this.$compile = $compile;
    this.$rootScope = $rootScope;
    this.$q = $q;
    this.$mdSidenav =$mdSidenav;

    this.deferred = null;

  }
}
