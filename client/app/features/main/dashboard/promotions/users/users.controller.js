
export default class usersPromotionsController {

  static get UID(){
    return "usersPromotionsController";
  }

  init() {

    this.contextual.showDrawer("userSearch").then((data) => {

      this.Spinner.show("add-users-promotion");
      this.promotion.addUsers(data.users).then(() => {

        this.Snack.show(this.LabelService.SNACK_PROMOTION_ADD_USER);
        this.Spinner.hide("add-users-promotion");
        this.$state.go("main.dashboard.promotions");
        this.contextual.close();
      }, () => {

        this.Snack.showError(this.ErrorService.DEFAULT.message);
        this.Spinner.hide("add-users-promotion");
      });
        
    }, (err) => {
      this.$state.go("main.dashboard.promotions");
      console.log("Error with userSearch drawer");
    }, () => {
      this.DialogService.show(this.ErrorService.EMPTY_ADD_USER_PROMO.title,
                                this.ErrorService.EMPTY_ADD_USER_PROMO.message,
                                [{ name: this.LabelService.CONFIRMATION }]);
      });
  }

  findPromotionById(promotionId) {
    const filtered = this.promotions.filter((promotion) => {
      return +promotion.id === +promotionId;
    });

    return filtered.length ? filtered[0] : null;
  }

  /* @ngInject */
  constructor($q, $state, $stateParams, Spinner, Snack, DialogService, ErrorService, LabelService, $timeout, contextual, promotions) {
    "ngInject";
    this.$state = $state;
    this.Spinner = Spinner;
    this.$q = $q;
    this.Snack = Snack;
    this.DialogService = DialogService;
    this.ErrorService = ErrorService;
    this.LabelService = LabelService;
    this.$timeout = $timeout;
    this.contextual = contextual;
    this.promotions = promotions;
    this.promotion = this.findPromotionById($stateParams.promotionId);

    this.$timeout(() => {
      this.init();
    })
    

  }
}
