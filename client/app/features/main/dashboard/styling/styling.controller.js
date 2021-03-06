
export default class stylingController {
  static get UID(){
    return "stylingController";
  }

  clearLocationParam(){
    angular.forEach(this.$location.search(),(i,k)=>{
     if (k.indexOf("drawer") === 0){
        this.$location.search(k,null)
      }
    })
  }

  loadDrawers() {
    if(this.$location.path().indexOf('/mobileApp') >= 0) {
      this.loadWebordersDrawer = false;
      this.loadEmailsDrawer = false;
      this.loadMobileDrawer = true;
    } else if(this.$location.path().indexOf('/emails') >= 0) {
      this.loadWebordersDrawer = false;
      this.loadEmailsDrawer = true;
      this.loadMobileDrawer = false;
    } else if (this.$location.path().indexOf('/weborders') >= 0) {
      this.loadWebordersDrawer = true;
      this.loadEmailsDrawer = false;
      this.loadMobileDrawer = false;
    }
  }

  constructor($location, $rootScope) {
    "ngInject";

    this.$location = $location;

    $rootScope.$on('$locationChangeSuccess', this.loadDrawers.bind(this));
    this.clearLocationParam();
    this.loadDrawers();
  }
}
