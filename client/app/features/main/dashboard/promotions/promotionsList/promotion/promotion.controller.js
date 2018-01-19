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

  savePromotion(){
    return this.$q((resolve,reject)=>{
      this.Spinner.show("saving-promotion");
      Preoday.Offer.create(this.promotion)
        .then((newPromotion)=>{
          this.Spinner.hide('saving-promotion')
          console.log("promotion-saved",this.promotion)
          resolve(newPromotion);
      },(err)=>{
        this.Spinner.hide('saving-promotion');
        reject(err);
      })
    })
  }

  checkPromotionValidity() {
    if (this.promotion.endDate) {
      let finalDate = new Date(this.promotion.endDate);
      let now = new Date();
      if (finalDate < now) {
        this.onPause();
      }
    }
  }

  onAddUser() {
    this.$state.go("main.dashboard.promotions.users", {promotionId: this.promotion.id});
  }

  isAddUser(){
    return this.promotion.global === 0;
  }

  onSuccessForVenue(entity) {

    this.contextualMenuSuccess(entity);
  }

  isBlockedForVenue() {
    return this.promotion.parentId && this.promotion.parentId > 0 && this.StateService.venue && this.StateService.venue.id;
  }

  onSuccessForChannel(entity) {

    const {
      DialogService,
      ErrorService,
      LabelService,
    } = this;

    if (!entity.name || (
              !entity.entitiesInvited.venueIds.length &&
              !entity.entitiesInvited.groupIds.length &&
              !entity.entitiesInvited.channelId)) {

      DialogService.show(ErrorService.CHANNEL_ENTITIES_REQUIRED.title, ErrorService.CHANNEL_ENTITIES_REQUIRED.message, [{
        name: LabelService.CONFIRMATION
      }]);

      return;
    }

    this.contextualMenuSuccess(entity);
  }

  contextualMenuSuccess(entity){
    this.Spinner.show("save-update-promotion");
    if (this.promotion && entity && entity.name){

      this.promotion = entity;
      var saveOrUpdate = this.promotion.id ? this.updatePromotion.bind(this) : this.savePromotion.bind(this);
      saveOrUpdate().then((newPromotion)=>{

        this.promotion.$deleted = false;
        this.promotion.$selected = false;

        this.$timeout(() => {
          angular.extend(this.promotion, newPromotion);
          this.checkPromotionValidity();
          this.contextualMenu.hide();
          this.Spinner.hide("save-update-promotion");
          this.Snack.show(this.LabelService.SNACK_PROMOTION_SAVED);
        });

      }, (err)=>{
        console.log('error on save promotions', err);
        this.Spinner.hide("save-update-promotion");
        if (err && err.errorCode && err.errorCode === this.APIErrorCode.EXISTING_OFFER_CODE) {
          this.Snack.showError(this.LabelService.SNACK_PROMOTION_EXISTING_CODE);
        } else {
          this.Snack.showError(this.LabelService.SNACK_PROMOTION_SAVED_ERROR);
        }

      }). catch((err)=>{
        console.error('error on save promotions', err);
        this.Spinner.hide("save-update-promotion");
        if (err && err.errorCode && err.errorCode === this.APIErrorCode.EXISTING_OFFER_CODE) {
          this.Snack.showError(this.LabelService.SNACK_PROMOTION_EXISTING_CODE);
        } else {
          this.Snack.showError(this.LabelService.SNACK_PROMOTION_SAVED_ERROR);
        }
      })
    }
  }

  onEdit ($event) {
    this.originalPromotion  = angular.copy(this.promotion);
    this.cardItemList.selectItem(this.promotion);
    this.showContextual();
    $event.stopPropagation();
  }

// TODO make resume button active when promotion is active but expiration date has ended


  onPause(newStatus){

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
    this.contextual.showMenu(this.type, this.promotion, this.onSuccessCallback.bind(this), this.contextualMenuCancel.bind(this), this.params);
  }

  /* @ngInject */
  constructor($q, $stateParams, $state, Spinner, Snack, $timeout, DialogService, LabelService, ErrorService, contextual, contextualMenu, APIErrorCode, StateService, gettextCatalog) {
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
    this.contextualMenu = contextualMenu;
    this.contextual = contextual;
    this.type = 'promotion';
    this.APIErrorCode = APIErrorCode;
    this.StateService = StateService;
    console.log("state params, ", $stateParams.promotionId, this.promotion.id);

    this.params = {};

    if (StateService.isChannel) {
      this.params.entities = StateService.channel.entities;
      this.params.entities.channel = StateService.channel;
      this.onSuccessCallback = this.onSuccessForChannel;

      if (!this.promotion.id) {
        this.params.onBeforeSubmit = function() {
          // The 'this' here is the ContextualMenuController.
          // because there we are calling this.params.onBeforeSuccess.call(this); and it is changing the function scope
          if (this.contextualForm.$invalid) {
            this.contextualForm.submitted = true;
            return this.$scope.$broadcast(this.BroadcastEvents.ON_CONTEXTUAL_FORM_SUBMITTED);
          }

          if (this.contextualForm.selectedTabIndex === 2) {
            return this.onSubmit();
          }

          this.contextualForm.selectedTabIndex = 2;
        };

        this.params.doneButtonText = function () {
          // The 'this' here is the ContextualMenuController.
          // because there we are calling this.params.doneButtonText.call(this); and it is changing the function scope
          if (this.contextualForm && this.contextualForm.selectedTabIndex === 2) {
            return this.gettextCatalog.getString('Done');
          }

          return this.gettextCatalog.getString('Choose Venues');
        };
      }

    } else {
      this.params.doneButtonText = gettextCatalog.getString('Done');
      this.onSuccessCallback = this.onSuccessForVenue;
    }

    if (this.promotion && !this.promotion.id || $stateParams.promotionId && $stateParams.promotionId == this.promotion.id) {
      this.showContextual();
    }
  }
}
