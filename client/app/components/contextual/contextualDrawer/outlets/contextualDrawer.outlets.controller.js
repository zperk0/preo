export default class contextualDrawerOutletsController {
  static get UID(){
    return "ContextualDrawerOutlets";
  }

  close(){
    this.$mdSidenav('outlets').close()
      .then(function () {
        console.log("close Modifiers is done");
      });

  }

  constructor($scope, OutletService, $stateParams,$mdSidenav) {
    "ngInject";
    this.$mdSidenav = $mdSidenav;
    this.cancelledOutlets = [];

    OutletService.getOutlets({
      venueId: $stateParams.venueId
    }).then((data)=>{

      console.log('outlet service data here', data);

      this.data = data;
    }, () => {
      console.log('error outlet service');
    })    
  }
}
