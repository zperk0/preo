
export default class promotionsController {
  static get UID(){
    return "promotionsCtrl";
  }

  onCreate() {
     this.$state.go('main.dashboard.promotions.new');
   }

   onEdit(promotion) {
     this.$state.go('main.dashboard.promotions.edit', {
       offerId: promotion.id
     });
   }

   onAfterDelete(promotion) {
     const indexPromotion = this.promotions.indexOf(promotion);
     if (indexPromotion > -1) {
       this.promotions.splice(indexPromotion, 1);
     }
   }

   init(){

     if (this.StateService.venue && this.StateService.venue.isEvent()){ //pre-load events
       this.EventService.getLastWeekEvents(this.StateService.venue.id)
     }
   }

   /* @ngInject */
   constructor($scope, $state, promotions, StateService, EventService) {
     'ngInject';
     // Dependencies
     this.$state = $state;
     // Resolves and Defaults
     this.promotions = promotions;
     this.EventService = EventService;
     this.StateService = StateService;

     this.init();
   }




  // /* @ngInject */
  // constructor($q, Spinner, Snack, StateService, EventService,  $timeout, promotions) {
  //   "ngInject";
  //   this.Spinner = Spinner;
  //   this.$q = $q;
  //   this.Snack = Snack;
  //   this.StateService = StateService;
  //   this.EventService = EventService;
  //   this.$timeout = $timeout;
  //   this.init();
  //   this.promotions = promotions;

  // }
}
