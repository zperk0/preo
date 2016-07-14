export default class modifierItemController {
  static get UID(){
    return "modifierItemController"
  }

  onNewModifierMoved($modifiers, $partFrom, $partTo, $indexFrom, $indexTo){
    console.log("moved", $modifiers)
    this.Snack.show("moving modifier to modifier");
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
            return this.ModifierService.deleteModifier(this.modifier)
        })
        .then(()=>{
            this.cardItemList.onItemDeleted(this.modifier);
            this.Snack.show('Item deleted');
            this.Spinner.hide("modifier-delete");
        })
        .catch((err)=>{
          console.log("Failed deleting Modifier", err)
          this.Spinner.hide("modifier-delete")
          this.Snack.showError('Modifier not deleted');
        })
    }

    createModifier(){
      this.Spinner.show("modifier-create")
      this.ModifierService.createModifier(this.modifier)
        .then((createdModifier)=>{
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
          this.modifier = updatedModifier;
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
      if (!this.modifier.id){
        this.createModifier();
      }
      else {
        this.updateModifier(updates);
      }
    }

    restoreOriginalValues(){
      if (this.originalItem){
        this.modifier = this.originalItem;
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
    this.restoreOriginalValues()
    this.modifier.$selected = false;
    if (!this.modifier.id){
      this.cardItemList.clearPossibleNewItem();
    }
    //clear selection
    this.cardItemList.selectItem();
  }

    constructor($timeout, contextual, DialogService, contextualMenu, LabelService, Spinner, Snack, ModifierService) {
      'ngInject';
      this.Spinner = Spinner;
      this.Snack = Snack;
      this.contextualMenu = contextualMenu;
      this.contextual = contextual;
      this.LabelService = LabelService
      this.DialogService = DialogService
      this.ModifierService = ModifierService;
      this.showCardActions = false;
      this.type="modifier";
      this.newModifiers = [];

      if (this.modifier && !this.modifier.id) {
        console.log("in constructor calling")
        $timeout(()=>{
          contextual.showMenu(this.type, this.modifier, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
        })
      }
    }
}
