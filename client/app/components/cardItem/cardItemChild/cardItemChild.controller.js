export default class cardItemChildController {
  static get UID(){
    return "cardItemChildController";
  }

  onNewModifierMoved($modifiers, $partFrom, $partTo, $indexFrom, $indexTo){
    //is Adding to self?
    if ($modifiers.map((m)=>m.id).indexOf(this.option.modifierId)>-1){
      return;
    }

    //item has modifier?
    if (this.ModifierService.isModifiersDuplicated($modifiers, this.option)){
      return this.Snack.showError("One or more modifiers already in option");
    }

    //is cyclic reference?
    if (this.ModifierService.canAddModifier(this.modifier, $modifiers)){
      return this.Snack.showError("Cannot create cyclic set of modifiers");
    }

    this.Spinner.show("moving-modifier-option");

    let promises = this.ModifierService.addModifiersToParent($modifiers, this.option);

    this.$q.all(promises).then(()=>{
      this.Snack.show("Added modifiers to option");
    },()=>{
      this.Snack.showError("Error adding modifiers to option");
    })
    .then(()=>{
      this.Spinner.hide("moving-modifier-option");
    })
  }

  constructor(Snack, Spinner, $q, ModifierService) {
    'ngInject';
    this.ModifierService=ModifierService;
    this.Snack = Snack;
    this.Spinner = Spinner;
    this.$q = $q;
    this.newModifiers=[];
  }
}
