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
    if (this.ModifierService.canAddModifiers($modifiers, this.modifier)){
      return this.Snack.showError("Cannot create cyclic set of modifiers");
    }

    this.Spinner.show("moving-modifier-option");

    let promise = this.ModifierService.addCustomModifierToParent($modifiers, this.option);

    promise.then((modifiers)=>{

      Array.prototype.push.apply(this.option.modifiers, modifiers);
      Array.prototype.push.apply(this.modifiers, modifiers);

      this.Snack.show("Added modifiers to option");
    },()=>{
      this.Snack.showError("Error adding modifiers to option");
    })
    .then(()=>{
      this.Spinner.hide("moving-modifier-option");
    })
  }

  onModifierRemoved (modifier) {

    let index = this.option.modifiers.map((mod) => {

      return mod.id;
    }).indexOf(modifier.id);

    if (index !== -1) {
      this.modifiers.splice(index, 1);
      this.option.modifiers.splice(index, 1);
    }
  }

  buildModifiers () {

    if (!this.option.modifiers) {
      return;
    }

    this.modifiers = this.option.modifiers.map((_modifier, index) => {

      return this.ModifierService.getById(_modifier.id);
    });
  }

  constructor($scope, Snack, Spinner, $q, ModifierService, BroadcastEvents) {
    'ngInject';
    this.ModifierService = ModifierService;
    this.Snack = Snack;
    this.Spinner = Spinner;
    this.$q = $q;
    this.newModifiers=[];
    this.modifiers = [];

    $scope.$watch(() => {

      return this.option.modifiers;
    }, () => {

      this.buildModifiers();
    }, true);

    $scope.$on(BroadcastEvents.ON_DELETE_MODIFIER, (event, modifier) => {

      this.onModifierRemoved(modifier);
    });
  }
}
