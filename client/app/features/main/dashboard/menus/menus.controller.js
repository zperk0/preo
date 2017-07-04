
export default class menusController {
  static get UID(){
    return "menusController";
  }


  constructor($stateParams, ErrorService, TaxesService, Spinner) {
    "ngInject";
    Spinner.hide('resolve-menus');
    console.log(" on menus controller ");
    TaxesService.getTaxGroups(true); // pre-load tax groups, non-blocker
  }
}
