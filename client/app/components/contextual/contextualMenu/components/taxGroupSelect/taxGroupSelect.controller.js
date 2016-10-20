export default class taxGroupSelectController {
  static get UID(){
    return "taxGroupSelectController"
  }


 constructor(TaxesService) {
    "ngInject";
    TaxesService.getTaxGroups()
      .then((taxes)=>{
        this.taxes  = taxes;
      });

  }
}
