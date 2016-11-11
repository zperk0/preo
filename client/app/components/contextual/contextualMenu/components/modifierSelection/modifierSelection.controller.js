export default class modifierSelectionController {
  static get UID(){
    return "modifierSelectionController"
  }

  onSelectionSelect(){
    this.modifier.minChoices = this.modifier.$isOptional ? 0 : 1;
  }

  isSaving () {

    return this.Spinner.isCodeVisible('modifier-create') || this.Spinner.isCodeVisible('modifier-update');
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
