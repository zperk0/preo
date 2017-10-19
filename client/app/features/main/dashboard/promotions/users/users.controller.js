
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

  /* @ngInject */
  constructor($q, $state, $timeout, Spinner, Snack, DialogService, ErrorService, LabelService, contextual, promotion) {
    "ngInject";
    this.$state = $state;
    this.Spinner = Spinner;
    this.$q = $q;
    this.Snack = Snack;
    this.DialogService = DialogService;
    this.ErrorService = ErrorService;
    this.LabelService = LabelService;
    this.contextual = contextual;
    this.promotion = promotion;

    $timeout(() => {
      this.init();
    });

  }
}
