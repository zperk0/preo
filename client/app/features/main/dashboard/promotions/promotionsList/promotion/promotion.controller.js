export default class promotionController {
  static get UID(){
    return "promotionController"
  }

  onDelete(){
    this.DialogService.delete(this.LabelService.TITLE_DELETE_PROMOTION, this.LabelService.CONTENT_DELETE_PROMOTION)
      .then(()=>{
          this.Spinner.show("promotion-delete");
          this.promotion.remove()
            .then(()=>{
              this.cardItemList.onItemDeleted(this.promotion);
              if (this.onItemDeleted){
                this.onItemDeleted({item:this.promotion});
              }
              this.Snack.show(this.LabelService.SNACK_PROMOTION_DELETED);
              this.Spinner.hide("promotion-delete");
          }, (error)=>{
            this.Spinner.hide("promotion-delete")
            this.Snack.showError(this.LabelService.SNACK_PROMOTION_DELETED_ERROR);
          })
          .catch((err)=>{
            this.Spinner.hide("promotion-delete")
            this.Snack.showError(this.LabelService.SNACK_PROMOTION_DELETED_ERROR);
          });
      });
  }

  isPaused(){
    return !this.promotion.active || (this.promotion.startDate && this.promotion.endDate && !this.promotion.now);
  }

  isSelected() {
    return this.promotion && +this.promotion.id === +this.$stateParams.promotionId;
  }

  updatePromotion(){
     return this.$q((resolve,reject)=>{
      this.Spinner.show("saving-promotion");
      this.promotion.update()
      .then((newPromotion)=>{
        this.Spinner.hide('saving-promotion')
        console.log("promotion-saved",this.promotion)
        resolve(newPromotion);
      },reject)
    })
  }

  onAddUser() {
    this.$state.go("main.dashboard.promotions.users", {promotionId: this.promotion.id});
  }

  isAddUser(){
    return this.promotion.global === 0;
  }

  isBlockedForVenue() {
    return this.promotion.parentId && this.promotion.parentId > 0 && this.StateService.venue && this.StateService.venue.id;
  }

// TODO make resume button active when promotion is active but expiration date has ended
  onPause(newStatus){ console.log('pausedddd ----');

    const updateActiveStatus = ()=>{
      this.promotion.active = newStatus ? 1 : 0;
      this.updatePromotion();
    }

    if (newStatus){
        this.DialogService.show(this.LabelService.TITLE_INACTIVE_PROMOTION, this.LabelService.CONTENT_INACTIVE_PROMOTION, [{
        name: this.LabelService.CONFIRMATION
      }], {
        hasCancel: true
      }).then(()=>{
        this.promotion.startDate = null;
        this.promotion.endDate = null;
        this.promotion.now = true;
        updateActiveStatus();
      })
    } else {
      updateActiveStatus();
    }
  }

  /* @ngInject */
  constructor($q, $stateParams, $state, Spinner, Snack, $timeout, DialogService, LabelService, ErrorService, APIErrorCode, StateService, gettextCatalog) {
    "ngInject";
    this.$q = $q;
    this.$stateParams = $stateParams;
    this.$state = $state;
    this.title = "I am a promotion component"
    this.Spinner = Spinner;
    this.$timeout = $timeout;
    this.Snack = Snack;
    this.DialogService = DialogService;
    this.LabelService = LabelService;
    this.ErrorService = ErrorService;
    this.APIErrorCode = APIErrorCode;
    this.StateService = StateService;
  }
}