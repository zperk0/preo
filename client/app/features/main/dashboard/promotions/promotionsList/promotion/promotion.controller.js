export default class promotionController {
  static get UID(){
    return "promotionController"
  }

  fakePromotionDelete(){
    return this.$q.resolve();
  }

  onDelete(){
    this.DialogService.delete(this.LabelService.TITLE_DELETE_PROMOTION, this.LabelService.CONTENT_DELETE_PROMOTION)
      .then(()=>{
          this.Spinner.show("promotion-delete");
          // this.promotion.remove()
          this.fakePromotionDelete()
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
    return !this.promotion.active;
  }

  updatePromotion(){
     return this.$q((resolve,reject)=>{
      this.Spinner.show("saving-promotion");
      //this.promotion.update().then(
      this.$timeout(
        ()=>{
          this.Spinner.hide('saving-promotion')
          console.log("promotion-saved",this.promotion)
          resolve();
        },1000)
    })
  }
  savePromotion(){
    return this.$q((resolve,reject)=>{
      this.Spinner.show("saving-promotion");
      //this.promotion.update().then(
      this.$timeout(
        ()=>{
          this.Spinner.hide('saving-promotion')
          console.log("promotion-saved",this.promotion)
          resolve();
        },1000)
    })
  }

  contextualMenuSuccess(entity){
    this.Spinner.show("save-update-promotion");
    if (this.promotion && entity && entity.name){

      this.promotion = entity;
      var saveOrUpdate = this.promotion.id ? this.savePromotion.bind(this) : this.updatePromotion.bind(this);
      saveOrUpdate().then((newPromotion)=>{

        this.promotion.$deleted = false;
        this.promotion.$selected = false;

        this.$timeout(() => {
          angular.extend(this.promotion, newPromotion);
          this.contextualMenu.hide();
          this.Spinner.hide("save-update-promotion");
          this.Snack.show(this.LabelService.SNACK_PROMOTION_SAVED);
        });
      }, (err)=>{
        console.log('error on save user-role', err);
        this.Spinner.hide("save-update-promotion");
        this.Snack.showError(this.LabelService.SNACK_PROMOTION_SAVED_ERROR);
      }). catch((err)=>{
        console.error('error on save user-role', err);
        this.Spinner.hide("save-update-promotion");
        this.Snack.showError(this.LabelService.SNACK_PROMOTION_SAVED_ERROR);
      })
    }
  }



  onEdit ($event) {
    this.originalPromotion  = angular.copy(this.promotion);
    this.cardItemList.selectItem(this.promotion);
    this.showContextual();
    $event.stopPropagation();
  }

  onPause(newStatus){
    console.log("on pause", newStatus, arguments);
    this.promotion.active = newStatus ? 1 : 0;
    this.updatePromotion();
  }

  restoreOriginalValues() {
    if (this.originalPromotion){
      angular.extend(this.promotion, this.originalPromotion);
      this.originalPromotion = false;
    }
  }

  contextualMenuCancel() {

    this.restoreOriginalValues();
    this.promotion.$selected = false;

    if (this.promotion && !this.promotion.id) {
      this.cardItemList.deleteItem(this.promotion);
    }
  }

  showContextual () {
    this.contextual.showMenu(this.type, this.promotion, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
  }

  /* @ngInject */
  constructor($q, Spinner, Snack, $timeout, DialogService, LabelService, contextual, contextualMenu) {
    "ngInject";
    this.$q = $q;
    this.title = "I am a promotion component"
    this.Spinner = Spinner;
    this.$timeout = $timeout;
    this.Snack = Snack;
    this.DialogService = DialogService;
    this.LabelService = LabelService;
    this.contextualMenu = contextualMenu;
    this.contextual = contextual;
    this.type = 'promotion';
    if (this.promotion && !this.promotion.id) {
      this.showContextual();
    }
  }
}
