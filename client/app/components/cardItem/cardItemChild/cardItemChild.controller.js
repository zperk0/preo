export default class cardItemChildController {
  static get UID(){
    return "cardItemChildController";
  }

  onNewModifierMoved($modifiers, $partFrom, $partTo, $indexFrom, $indexTo){

    //item has modifier?
    var isDup = this.isModifierDuplicated($modifiers)
    if (isDup){
      if (typeof isDup === 'string'){
        this.Snack.showError(isDup);
      }
      return;
    }

    var isCyclic = this.ModifierService.canAddModifier(this.modifier, $modifiers);
    if (isCyclic){
      this.Snack.showError("Cannot create cyclic set of modifiers");
      return;
    }

    this.Spinner.show("moving-modifier-option");
    let promises = [];
    $modifiers.forEach((modifier)=>{
      let modClone = angular.copy(modifier);
      modClone.position = (this.option.modifiers && this.option.modifiers.length ? this.option.modifiers[this.option.modifiers.length-1].position : 0 ) + 1000
      promises.push(this.option.saveModifier(modClone).then((mod)=>{
        this.option.modifiers.push(mod);
      }))
    })
    this.$q.all(promises).then(()=>{
      this.Snack.show("Added modifiers to option");
    },()=>{
      this.Snack.showError("Error adding modifiers to option");
    })
    .then(()=>{
      this.Spinner.hide("moving-modifier-option");
    })
  }


  isModifierDuplicated(modifiers){
   for (let j=0;j<modifiers.length;j++){
    if (this.option.modifierId === modifiers[j].id){
      return true;
     }
     let found = 0;
     if (this.option.modifiers){
        for (let i=0;i<this.option.modifiers.length;i++){
          if (this.option.modifiers[i].id === modifiers[j].id){
            found++;
            // sort list adds the item in the new list, if we find it we must remove it
            if (found){
              return "One or more modifiers already in option";
            }
          }
        }
      }
    }
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
