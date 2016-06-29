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

  getItemImage(newItemData){
    return this.$q((resolve,reject)=>{
      console.log("before get", newItemData)
      if (!newItemData.$image && newItemData.images.length){
        console.log("before b64", newItemData)
        this.UtilsService.getBase64Image(newItemData.images[0].image)
          .then((base64img)=>{
            newItemData.$image = base64img;
            newItemData.images = [];
            console.log("got b64", newItemData)
            resolve();
          },reject);
      } else {
        resolve();
      }
    });
  }


  cloneItem(itemToClone){
    const newItemData = angular.copy(itemToClone);
    newItemData.position = this.calculateNewItemPos(itemToClone);
    // create new $image ref for upload

    return this.$q((resolve, reject)=>{
      this.getItemImage(newItemData)
        .then(()=>{
          return this.createItem(newItemData)
        })
        .then(()=>{
          this.Snack.show('Item duplicated');
          resolve();
        }, ()=>{
          this.Snack.showError('Error duplicating item');
          reject();
        });
    });
  }

  saveItemExtensions(item, venueId){
    return item.updateTags()
      .then(()=>{
        console.log("saving image");
        if (item.$image){
          console.log("saving imga really");
          return Preoday.ItemImage.saveToCdn(item.$image, item.id, venueId)
        }
      })
      .then((itemImage)=>{
        if (itemImage) {
          console.log("got image from cdn");
          if (item.images && item.images.length){
            console.log("updating", itemImage, item.images[0])
            item.images[0].image = itemImage.image;
            return item.images[0].update();
          } else {
            console.log("saving image to api")
            return Preoday.ItemImage.save(itemImage);
          }
        }
      })
  }

  saveItem(updatedItem){
    this.Spinner.show("item-save");
    return this.$q((resolve, reject)=>{
      updatedItem.update()
        .then((item) => {
          item.images = updatedItem.images;
          item.tags = updatedItem.tags;
          item.$image = updatedItem.$image;
          updatedItem = item;
          return updatedItem;
        })
        .then(()=>{
          return this.saveItemExtensions(updatedItem, this.$stateParams.venueId)
        })
        .then(()=>{
          resolve();
          this.Spinner.hide("item-save");
        },(err)=>{
          console.log("rejecting", err)
          this.Spinner.hide("item-save");
          reject();
        })
        .catch(()=>{
          console.log("on catch");
          this.Spinner.hide("item-save");
          reject();
        })
    });
  }

  createItem(newItem){
    return this.$q((resolve, reject)=>{
      this.Spinner.show("item-create");
      //save item
      Preoday.Item.save(newItem)
        .then((item)=>{
          //restore needed items here
          item.menuId = newItem.menuId;
          item.sectionId = newItem.sectionId;
          item.position = newItem.position;
          item.images = newItem.images;
          item.tags = newItem.tags;
          item.$image = newItem.$image;

          this.addItemInPosition(item);
          this.clearPossibleNewItem();
          return item;
      }).then((item)=>{
          this.saveItemExtensions(item, this.$stateParams.venueId)
      })
      .then(()=>{
        resolve();
        this.Spinner.hide("item-create")
      }, (err) => {
        console.log("Failed to save item", err);
        throw "failed to save item";
      })
      .catch(()=>{
        this.Spinner.hide("item-create");
        reject();
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
    this.Spinner.show("item-move");
    const promises = [];
    this.items.forEach((i, index)=>{
      i.position=index*1000;
      promises.push(i.update());
    });
    this.$q.all(promises).then(()=>{
      this.Snack.show('Item moved');
    }, ()=>{
      this.Snack.showError('Error moving item');
    }).then(()=>{
      this.Spinner.hide("item-move");
    })
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
    let isCreating = false;
    this.items.forEach((s, index)=>{
      if (s.id === -1){
        isCreating = true;
      }
    });
    if (isCreating){
      console.log("Not showing section new, already showing")
      return;
    }
    console.log("creating item")
    let newItem = {
        id:-1,
        menuId:this.section.menuId,
        sectionId:this.section.id,
        $selected:true,
        quantity:1,
        $size:0,
        visible:1,
        tags:[],
        venueId:this.$stateParams.venueId,
        position: this.items.length ? (this.items[this.items.length-1]).position + 1000 : 0
    };
    this.items.push(newItem);
    $event.stopPropagation();
  }

  constructor($q, Snack, Spinner, $stateParams, UtilsService) {
    "ngInject";
    this.Snack = Snack;
    this.$stateParams = $stateParams;
    this.Spinner = Spinner;
    this.UtilsService = UtilsService;
    this.$q = $q;

  }
}
