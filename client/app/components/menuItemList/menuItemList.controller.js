export default class menuItemListController {
  static get UID(){
    return "menuItemListController"
  }

   clearPossibleNewItem(){
    // remove item with id -1, (possible new item)
    this.items = this.items.filter((i)=>i.id !== -1);
  }

  calculateNewItemPos(itemBefore){
    var pos = -1;
    //if we have a item before, we should add it after this item
    if (itemBefore){
      this.items.forEach((i,index)=>{
        if (i.id === itemBefore.id){
          pos = itemBefore.position;
          let itemAfter = this.items[index+1];
          if (!itemAfter) {
            //if we don't get a item after we're in the last item, just add 1000
            pos+=1000;
          } else {
            //else new item pos is the middle of item after and item before
            pos += (itemAfter.position - pos)/2
          }
        }
      })
      if (pos !== -1) {
        //if we have a pos return it
        return pos;
      }
    }
    //default is last item size + 1000
    return (this.items[this.items.length-1]).position + 1000
  }


  cloneItem(itemToClone){
    const newItemData = angular.copy(itemToClone);
    newItemData.position = this.calculateNewItemPos(itemToClone);
    return this.$q((resolve, reject)=>{
      this.createItem(newItemData)
        .then(()=>{
          this.Snack.show('Item duplicated');
          resolve();
        }, ()=>{
          this.Snack.showError('Error duplicating item');
          reject();
        });
    });
  }

  createItem(newItem){
    return this.$q((resolve, reject)=>{
      this.Spinner.show("item-create");
      Preoday.Item.save(newItem)
        .then((item)=>{
          //restore needed items here
          item.menuId = newItem.menuId;
          item.sectionId = newItem.sectionId;
          item.position = newItem.position;

          this.Snack.show('Item created');
          this.addItemInPosition(item);
          resolve();
      },(err)=>{
        reject(err);
        this.Snack.showError('Error saving item');
      }).then(()=>{
        this.Spinner.hide("item-create");
      })
    });
  }

  addItemInPosition(item){
    let indexBefore = -1;
    this.items.forEach((i, index)=>{
      if (i.position <= item.position){
        indexBefore = index;
      }
    })
    this.items.splice(indexBefore+1, 0, item);
  }

  selectItem(item){
    if (this.items){
      this.items.forEach((i, index)=>{
        if (item && i.id === item.id){
          i.$selected = true;
        } else{
          i.$selected=false;
        }
      });
    }
  }

  onItemMoved($index){
    //update all items
    this.items.forEach((i, index)=>{
      i.position=index*1000;
      i.update();
    });
  }

  deleteItem(item){
    // call Preoday.Item or Preoday.Section method to delete item or remove from section
    this.Spinner.show("item-delete");
    const deleteAction = this.section ? this.section.removeItems.bind(this.section) : item.delete.bind(item);
    deleteAction([item.id])
      .then(()=>{
        this.Snack.show('Item deleted');
        this.items = this.items.filter((i)=>item.id !== i.id);
      }, ()=>{
        console.log("error deleting item");
        this.Snack.showError('Error deleting item');
      }).then(()=>{
        this.Spinner.hide("item-delete");
      })
  }

  showCreateItem($event){
    let newItem = {
        id:-1,
        menuId:this.section.menuId,
        sectionId:this.section.id,
        $selected:true,
        quantity:1,
        $size:0,
        visible:1,
        venueId:this.$stateParams.venueId,
        position:(this.items[this.items.length-1]).position + 1000
    };
    this.items.push(newItem);
    $event.stopPropagation();
  }

  constructor($q, Snack, Spinner) {
    'ngInject';
    this.Snack = Snack;
    this.Spinner = Spinner;
    this.$q = $q;

  }
}