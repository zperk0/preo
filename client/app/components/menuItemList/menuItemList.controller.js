export default class menuItemListController {
  static get UID(){
    return "menuItemListController"
  }

   clearPossibleNewItem(){
    // remove item with id -1, (possible new item)
    if (this.items){
      this.items = this.items.filter((i)=>i.id);
    }
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

  onItemCreated(newItem){
    this.addItemInPosition(newItem);
    this.clearPossibleNewItem();
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

  updateItemsPositions(){
      //update all items
      const promises = [];
      this.items.forEach((i, index)=>{
        i.position=index*1000;
        promises.push(i.update());
      });
      return this.$q.all(promises);
  }

  onItemMoved($item, $partFrom, $partTo, $indexFrom, $indexTo){
    const that = this;
    if (!$item.sectionId){
      //only idd items that are not in the list yet
      if ($item.id){
        let found = 0;
        that.items.forEach((i)=>{
          if (i.id === $item.id){
            found++;
          }
        })
        // sort list adds the item in the new list, if we find it we must remove it
        if (found>1){
          that.Snack.showError('Item is already in section');
          $partTo.splice($indexTo,1);
          return;
        }
      }
      this.Spinner.show("item-move");
      $item.position = this.calculateNewItemPos($item);
      $item.menuId = this.section.menuId;
      this.section.moveItem($item)
        .then((item)=>{
          $item.sectionId = item.sectionId;
          return this.updateItemsPositions()
        }).then(()=>{
          this.Snack.show('Item added');
        }, (err)=>{
          console.log("error", err);
          this.Snack.showError('Error adding item');
        }).then(()=>{
        this.Spinner.hide("item-move");
      })
    } else {
      this.Spinner.show("item-move");
      this.updateItemsPositions().then(()=>{
        this.Snack.show('Item moved');
      }, ()=>{
        this.Snack.showError('Error moving item');
      }).then(()=>{
        this.Spinner.hide("item-move");
      })
    }

  }

  onItemDeleted(item){
    this.items = this.items.filter((i)=>item.id !== i.id);
  }

  showCreateItem($event, isImport){
    console.log("show creating", $event, isImport);

    let newItem = {
        $selected:true,
        quantity:1,
        $size:0,
        visible:1,
        tags:[],
        images:[],
        venueId:this.$stateParams.venueId
    };

    if(!isImport){
      let isCreating = false;
        this.items.forEach((s, index)=>{
          if (!s.id){
            isCreating = true;
          }
        });
        if (isCreating){
          return;
        }
      if (this.section && this.section.id) {
        newItem.menuId = this.section.menuId;
        newItem.sectionId = this.section.id;
      }
      newItem.position = this.items.length ? (this.items[this.items.length-1]).position + 1000 : 0;
      this.items.push(newItem);
    } else {
      this.contextual.showDrawer('items');
    }

    $event.stopPropagation();
  }

  setMaxHeight(){
    var maxHeight = 1200;
    this.items.forEach((i)=>{
      maxHeight += 48 + 16 + (i.$size && i.$size.items ? i.$size.items.length * 35 : 0)
    })
     maxHeight+=48 + 16;
    this.element.css({"max-height":+maxHeight+"px"});
  }

  constructor($scope, $q, Snack, Spinner, $stateParams, UtilsService, contextual, DialogService, LabelService, ItemService) {
    "ngInject";
    this.Snack = Snack;
    this.$stateParams = $stateParams;
    this.Spinner = Spinner;
    this.UtilsService = UtilsService;
    this.$q = $q;
    this.items = this.items === undefined ? [] : this.items;
    this.contextual = contextual;
    this.LabelService = LabelService;
    this.DialogService = DialogService;
    this.ItemService = ItemService;

  }
}
