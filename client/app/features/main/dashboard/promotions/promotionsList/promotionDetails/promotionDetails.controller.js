export default class promotionDetailsController {
  static get UID(){
    return "promotionDetailsController"
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

  onSuccessForVenue(entity) {

    this.contextualMenuSuccess(entity);
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
        this.hasSaved = true;

        this.$timeout(() => {
          angular.extend(this.promotion, newPromotion);
          this.checkPromotionValidity();
          this.$state.go("main.dashboard.promotions");
         // this.contextualMenu.hide();
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

  onCancel() {

    this.$state.go('main.dashboard.promotions');
  }

  /* @ngInject */
  constructor($q, $scope, $stateParams, $state, Spinner, Snack, $timeout, DialogService, LabelService, ErrorService, APIErrorCode, StateService, gettextCatalog, promotion, promotions) {
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
    this.promotion = promotion;
    console.log("state params, ", $stateParams.promotionId, promotion.id);

    this.params = {};
    this.hasSaved = false;
    this.originalPromotion = angular.copy(promotion);
    this.template = 'promotion';
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

    $scope.$on('$destroy', () => {
      if (!this.hasSaved) {
        if (!this.promotion.id) {
          // it's a new invite and wasn't saved. So, we need to remove the empty item from the list
          promotions.splice(promotions.indexOf(promotion), 1);
        } else {
          angular.extend(this.promotion, this.originalPromotion);
        }
      }
    });
  }
}
