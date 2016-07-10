export default class modifierItemController {
  static get UID(){
    return "modifierItemController"
  }

  onEdit(){
    console.log("On edit");
    this.originalItem  = angular.copy(this.modifier);
    this.list.selectItem(this.modifier);
    this.contextual.showMenu(this.type, this.modifier, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
  }

    deleteModifier(){
      this.DialogService.delete(this.LabelService.TITLE_DELETE_MODIFIER, this.LabelService.CONTENT_DELETE_MODIFIER)
        .then(()=>{
            this.Spinner.show("modifier-delete");
            return this.ModifierService.deleteModifier(this.modifier)
        })
        .then(()=>{
            if(this.onItemDeleted){
              this.onItemDeleted({item:this.modifier});
            }
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
          this.Spinner.hide("modifier-create")
          this.Snack.show('Modifier created');
          this.contextualMenu.hide();
          if (this.onItemCreated){
            this.onItemCreated({item:this.modifier});
          }
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

  contextualMenuCancel(event, entity, type){
    this.restoreOriginalValues()
    this.modifier.$selected = false;
    if (!this.modifier.id){
      this.list.clearPossibleNewItem();
    }
    //clear selection
    this.list.selectItem();
  }

    constructor($timeout, contextual, DialogService, contextualMenu, LabelService, Spinner, Snack, ModifierService) {
      "ngInject";
      this.Spinner = Spinner;
      this.Snack = Snack;
      this.contextualMenu = contextualMenu;
      this.contextual = contextual;
      this.LabelService = LabelService
      this.DialogService = DialogService
      this.ModifierService = ModifierService;
      this.showCardActions = false;
      this.type="modifier";

      if (this.modifier && !this.modifier.id) {
        console.log("in constructor calling")
        $timeout(()=>{
          contextual.showMenu(this.type, this.modifier, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
        })
      }
    }
}
