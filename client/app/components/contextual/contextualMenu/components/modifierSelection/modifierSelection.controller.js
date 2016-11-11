export default class modifierSelectionController {
  static get UID(){
    return "modifierSelectionController"
  }

  onSelectionSelect(){
    this.modifier.minChoices = this.modifier.$isOptional ? 0 : 1;
  }

  constructor(Spinner) {
    "ngInject";

    this.Spinner = Spinner;

    this.modifier.$isOptional = this.modifier.minChoices === 0 ;

    if (this.modifier.maxChoices === -1) {
      this.modifier.maxChoices = '';
    }

    this.maxIntegerValue = 32766;
  }
}
