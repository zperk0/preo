
export default class promotionsController {
  static get UID(){
    return "promotionsCtrl";
  }

  onCreate() {
     this.$state.go('main.dashboard.promotions.new');
   }

   onEdit(promotion) {
     this.$state.go('main.dashboard.promotions.edit', {
       promotionId: promotion.id
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
     this.$scope = $scope;
     // Resolves and Defaults
     this.promotions = promotions;
     this.EventService = EventService;
     this.StateService = StateService;

     this.init();

     this.disabledSticky = true;

     const onViewContentLoaded = $scope.$on('$viewContentLoaded', (event, viewName) => {
       if (viewName.indexOf('promotionsView') === 0) {
         // we have an animation in our main-ui-view and we need to wait it to finish to start the sticky
         // If we start the sticky before the animation finish, the sticky will calculate a wrong width for our contextual
         this.disabledSticky = false;
       }
     });
   }
}
