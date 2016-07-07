export default class contextualDrawerService {
  static get UID(){
    return "contextualDrawer";
  }


  //same as close but doesn't call error callback
  close(){
    if (this.id){
      this.$mdSidenav(this.id).close();
      this.id = false;
    }
  }

  //DO NOT CALL THIS METHOD DIRECTLY, use the contextual service;
  show(id){
    if (this.id){
      this.close();
    }
    this.id = id;
    this.$mdSidenav(id)
      .toggle()

  }

  constructor($compile, $rootScope, $q, $mdSidenav) {
    "ngInject";
    this.$compile = $compile;
    this.$rootScope = $rootScope;
    this.$q = $q;
    this.$mdSidenav =$mdSidenav;

  }
}
