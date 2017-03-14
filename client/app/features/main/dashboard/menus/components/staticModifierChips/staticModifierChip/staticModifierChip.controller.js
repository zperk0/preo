export default class staticModifierChipController {
  static get UID(){
    return "staticModifierChipController"
  }

  doRemove(){
    if (this.item){
      return this.ModifierService.removeFromItem(this.modifier,this.item)
    } else if (this.section){
      return this.ModifierService.removeFromSection(this.modifier,this.section)
    } else if (this.parent){
      return this.ModifierService.removeFromParent(this.modifier,this.parent)
    } else if (this.modifierItem){
      return this.ModifierService.removeFromModifierItem(this.modifier,this.modifierItem)
    }
  }

  removeFromParent(){
    this.Spinner.show("removing-modifier-chip");
    this.doRemove()
      .then(()=> {

        this.onModifierRemoved && this.onModifierRemoved({
          modifier: this.modifier
        });

        this.Snack.show("Modifier removed");
        this.Spinner.hide("removing-modifier-chip");
      },()=>{
        this.Snack.showError("Error removing modifier");
        this.Spinner.hide("removing-modifier-chip");
      })

  }

  constructor($filter, ModifierService, Spinner, Snack) {
    "ngInject";
    this.ModifierService = ModifierService;
    this.Snack = Snack;
    this.Spinner = Spinner;

    if(this.modifier.items) {
      this.modifier.items.forEach((_item, index) => {
        _item.$formmattedPrice = $filter('currency')(_item.price);
      });
    }
  }
}
