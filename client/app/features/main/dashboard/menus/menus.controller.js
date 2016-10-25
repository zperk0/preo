
export default class menusController {
  static get UID(){
    return "menusController";
  }


  constructor($stateParams, ErrorService, TaxesService) {
    "ngInject";
    console.log(" on menus controller ");
    TaxesService.getTaxGroups(true); // pre-load tax groups, non-blocker
  }
}
