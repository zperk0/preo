export default class modifierItemController {
  static get UID(){
    return "modifierItemController"
  }

  onNewModifierMoved($modifiers, $partFrom, $partTo, $indexFrom, $indexTo){

    //is Adding to self?
    if ($modifiers.map((m)=>m.id).indexOf(this.modifier.id)>-1){
      return;
    }

    //has modifier?
    if (this.ModifierService.isModifiersDuplicated($modifiers, this.modifier)){
      return this.Snack.showError("One or more modifiers already in modifier");
    }

    //is cyclic reference?
    if (this.ModifierService.canAddModifiers($modifiers, this.modifier)){
      return this.Snack.showError("Cannot create cyclic set of modifiers");
    }

    this.Spinner.show("moving-modifier-modifiers");
    let promise = this.ModifierService.addCustomModifierToParent($modifiers, this.modifier);

    promise.then((modifiers)=>{

      Array.prototype.push.apply(this.modifier.modifiers, modifiers);
      Array.prototype.push.apply(this.modifiers, modifiers);

      this.Snack.show("Added modifiers to modifier");
    },()=>{
      this.Snack.showError("Error adding modifiers to modifier");
    })
    .then(()=>{
      this.Spinner.hide("moving-modifier-modifiers");
    })
  }


  isModifierDuplicated(modifiers){
   for (let j=0;j<modifiers.length;j++){
     let found = 0;
     if (this.modifier.id === modifiers[j].id){
      return true;
     }
      for (let i=0;i<this.modifier.modifiers.length;i++){
        if (this.modifier.modifiers[i].id === modifiers[j].id){
          found++;
          // sort list adds the item in the new list, if we find it we must remove it
          if (found){
            return 'One or more modifiers already in item';
          }
        }
      }
    }
  }

  onEdit(){
    console.log("On edit");
    this.originalItem  = angular.copy(this.modifier);
    this.cardItemList.selectItem(this.modifier);
    this.contextual.showMenu(this.type, this.modifier, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
  }

  deleteModifier(){
    this.DialogService.delete(this.LabelService.TITLE_DELETE_MODIFIER, this.LabelService.CONTENT_DELETE_MODIFIER)
      .then(()=>{
          this.Spinner.show("modifier-delete");

          let promise = this.ModifierService.deleteModifier(this.modifier)
          promise.then(()=>{
              // this.cardItemList.onItemDeleted(this.modifier);
              this.Snack.show('Item deleted');
              this.Spinner.hide("modifier-delete");
          })
          .catch((err)=>{
            console.log("Failed deleting Modifier", err)
            this.Spinner.hide("modifier-delete")
            this.Snack.showError('Modifier not deleted');
          });
      });
  }

    createModifier(){
      this.Spinner.show("modifier-create")
      this.ModifierService.createModifier(this.modifier)
        .then((createdModifier)=>{
          this.cardItemList.deleteItem(this.modifier);
          this.modifier = createdModifier;
          this.cardItemList.onItemCreated(this.modifier);
          this.Spinner.hide("modifier-create")
          this.Snack.show('Modifier created');
          this.contextualMenu.hide();
        }, (err)=>{
          console.log("failed creating item", err)
          this.Spinner.hide("modifier-create")
          this.Snack.showError('Failed creating modifier');
        })
    }

    updateModifier(updates){
      this.Spinner.show("modifier-update")
      return this.ModifierService.updateModifier(updates)
        .then((updatedModifier)=>{
          this.restoreValues(updatedModifier);
        })
      .then(()=>{
          this.Spinner.hide("modifier-update")
          this.Snack.show('Modifier updated');
          this.contextualMenu.hide();
          this.cardItemList.onItemUpdated(this.modifier);
      }, (err)=>{
        console.log("Failed updating Modifier", err)
        this.Spinner.hide("modifier-update")
        this.Snack.showError('Modifier not updated');
      })
    }

    contextualMenuSuccess(updates){

      if (!this.modifier.maxChoices) {
        this.modifier.maxChoices = -1;
      }

      if (!this.modifier.id){
        this.createModifier();
      }
      else {
        this.updateModifier(updates);
      }
    }

    //we do this by hand so we don't lose the reference to the modifier
    restoreValues(newValues = false){
      if(newValues){
        this.originalItem = newValues;
      }
      if (this.originalItem){
        for (var property in this.originalItem) {
        if (this.originalItem.hasOwnProperty(property) && property !== 'modifiers') {
          this.modifier[property] = this.originalItem[property];
          }
        }
        this.originalItem = false;
      }
    }

  cloneModifier(){
    this.Spinner.show("modifier-clone")
    this.ModifierService.cloneModifier(this.modifier)
      .then((createdItem)=>{
        this.Spinner.hide("modifier-clone")
        this.Snack.show('Modifier duplicated');
        this.cardItemList.onItemCreated(createdItem);
      }, (err)=>{
        console.log("failed duplicating modifier", err)
        this.Spinner.hide("modifier-clone")
        this.Snack.showError('Failed duplicating modifier');
    })
  }

  contextualMenuCancel(event, entity, type){
    this.restoreValues()
    this.modifier.$selected = false;

    if (this.modifier && !this.modifier.id) {
      this.modifier.$deleted = true;
      this.cardItemList.deleteItem(this.modifier);
    }
  }

  onModifierRemoved (modifier) {

    let index = this.modifier.modifiers.map((mod) => {

      return mod.id;
    }).indexOf(modifier.id);

    if (index !== -1) {
      this.modifiers.splice(index, 1);
      this.modifier.modifiers.splice(index, 1);
    }
  }

  buildModifiers () {

    this.modifiers = this.modifier.modifiers.map((_modifier, index) => {

      return this.ModifierService.getById(_modifier.id);
    });
  }

  constructor($scope, $q, $timeout, contextual, DialogService, contextualMenu, LabelService, Spinner, Snack, ModifierService, BroadcastEvents) {
    'ngInject';

    this.Spinner = Spinner;
    this.$q = $q;
    this.Snack = Snack;
    this.contextualMenu = contextualMenu;
    this.contextual = contextual;
    this.LabelService = LabelService
    this.DialogService = DialogService
    this.ModifierService = ModifierService;
    this.BroadcastEvents = BroadcastEvents;

    this.showCardActions = false;
    this.type = "modifier";
    this.newModifiers = [];
    this.modifiers = [];

    if (this.modifier && !this.modifier.id) {
      $timeout(()=>{
        contextual.showMenu(this.type, this.modifier, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
      })
    } else {
      this.buildModifiers();
    }

    $scope.$watch(() => {

      return this.modifier.modifiers;
    }, () => {

      this.buildModifiers();
    }, true);

    $scope.$on(BroadcastEvents.ON_DELETE_MODIFIER, (event, modifier) => {

      this.onModifierRemoved(modifier);
    });
  }
}
