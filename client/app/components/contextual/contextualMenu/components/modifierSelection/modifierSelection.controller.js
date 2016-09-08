export default class modifierSelectionController {
  static get UID(){
    return "modifierSelectionController"
  }

  onSelectionSelect(){
    this.modifier.minChoices = this.modifier.$isOptional ? 0 : 1;

    if (!this.modifier.maxChoices) {
      this.modifier.maxChoices = 1;
    }
  }

  constructor() {
    "ngInject";
    console.log(this.modifier.minChoices,"min choices")
    this.modifier.$isOptional = this.modifier.minChoices === 0 ;

    this.maxIntegerValue = 32766;
  }
}
