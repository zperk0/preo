export default class taxGroupSelectController {
  static get UID(){
    return "taxGroupSelectController"
  }

  onChange() {

  	this.ngChange && this.ngChange();
  }

 constructor(TaxesService) {
    "ngInject";
    TaxesService.getTaxGroups()
      .then((taxes)=>{
        this.taxes  = taxes;
      });

  }
}
