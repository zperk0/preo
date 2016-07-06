export default class contextualDrawerService {
  static get UID(){
    return "contextualDrawer";
  }

  resolve(res){
    if (this.onSuccess) {
      this.onSuccess(res);
    }
  }

  reject(err){
    this.close(err);
  }

  //same as close but doesn't call error callback
  hide(){
    if (this.$el){
      this.$el.remove();
    }
  }

  show(template, entity, onSuccess, onError){
    this.$mdSidenav('right')
      .toggle()
      .then(function () {
        console.log("on then");
      });
  }

  constructor($compile, $rootScope, $q, $mdSidenav) {
    "ngInject";
    this.$compile = $compile;
    this.$rootScope = $rootScope;
    this.$q = $q;
    this.$mdSidenav =$mdSidenav;

  }
}
