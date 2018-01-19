export default class taxGroupController {
  static get UID(){
    return 'taxGroupController';
  }

  onDelete() {
    const {DialogService, LabelService, ErrorService, Snack, Spinner, gettextCatalog, taxGroup} = this;
    const LOADER_KEY = 'tax-group-delete';

    DialogService.delete(LabelService.TITLE_DELETE_TAX_GROUP, LabelService.CONTENT_DELETE_TAX_GROUP)
      .then(() => {
        Spinner.show(LOADER_KEY);

        taxGroup.remove()
          .then(() => {
            if (angular.isFunction(this.onAfterDelete)) {
              this.onAfterDelete({taxGroup: taxGroup});
            }
            Snack.show(gettextCatalog.getString('Tax group deleted'));
            Spinner.hide(LOADER_KEY);
          }).catch((err) => {
            if (err.status && err.status == 409){
              DialogService.show(ErrorService.TAX_GROUP_ASSIGNED_TO_ITEM.title, ErrorService.TAX_GROUP_ASSIGNED_TO_ITEM.message, [{
                name: gettextCatalog.getString('Got it')
              }]);
            }
            Spinner.hide(LOADER_KEY);
            Snack.showError(gettextCatalog.getString('Tax group not deleted'));
          });
      });
  }

  /* @ngInject */
  constructor(DialogService, LabelService, ErrorService, Spinner, Snack, gettextCatalog) {
    'ngInject';
    this.DialogService = DialogService;
    this.LabelService = LabelService;
    this.ErrorService = ErrorService;
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.gettextCatalog = gettextCatalog;
  }
}
