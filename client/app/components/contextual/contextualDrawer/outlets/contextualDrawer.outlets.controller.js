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

  constructor($scope, OutletService, $stateParams, $mdSidenav, StateService) {
    "ngInject";
    this.$mdSidenav = $mdSidenav;
    this.cancelledOutlets = [];

    OutletService.getOutlets({
      venueId: StateService.venue.id
    }).then((data)=>{

      console.log('outlet service data here', data);

      this.data = data;
    }, () => {
      console.log('error outlet service');
    })
  }
}
