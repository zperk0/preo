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

  getItemImage(newItemData){
    return this.$q((resolve,reject)=>{
      if (newItemData.images.length && !newItemData.images[0].$save){
        this.UtilsService.getBase64Image(newItemData.images[0].image)
          .then((base64img)=>{
            newItemData.images = [{
              $image:base64img,
              $save:true
            }];
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
    if (newItemData.$size){
      delete newItemData.$size.id;
      delete newItemData.$size.itemId;
      newItemData.$size.$isMultiple = newItemData.$size.items && newItemData.$size.items.length > 0;
      newItemData.$size.items.forEach((modifierItem)=>{
        delete modifierItem.id;
        delete modifierItem.modifierId;
      })
    }

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
    // save item tags
    return item.updateTags()
    //save item images
      .then(()=>{
        if (item.images && item.images.length){
          let img = item.images[0];
          if (img.$save){
            return Preoday.ItemImage.saveToCdn(img.$image, item.id, venueId)
            .then((itemImage)=>{
              if (itemImage) {
                if (img.id){
                  console.log("Item already had image, so update record");
                  img.image = itemImage.image;
                  return img.update();
                } else {
                  return Preoday.ItemImage.save(itemImage);
                }
              }
            })
          } else if (img.$delete){
              // if we have a $image and it's a real image in the list delete it
              return img.delete().then(()=>{
                item.images = [];
              })
          }
        }
      })
      // save item sizes
      .then(()=>{
        //if we have an item size:
        if (item.$size){
          // if it's not to multiple we need to delete if it exists, the user has chosen a SINGLE item checkbox
          if (!item.$size.$isMultiple){
            if (item.$size.id){
              return item.$size.delete().then(()=>{
                item.$size = false;
              })
            }
          }  // else if it is set to multiple we check if it has an id and update it or if it doesnt we create a new one
          else if (!item.$size.id){
            item.$size.itemId=item.id;
            return Preoday.Modifier.save(item.$size).then((mod)=>{
              item.$size = mod;
            })
          } else {
            //if it's to be updated we should also check if it has any deleted items
            var promises = [];
            if (item.$size.$deletedItems && item.$size.$deletedItems.length){
              item.$size.$deletedItems.forEach((modifierItem)=>{
                  promises.push(modifierItem.delete());
              });
            }
            return this.$q.all(promises)
              .then(item.$size.update.bind(item.$size))
              .then((mod)=>{
                item.$size = mod;
              })
          }
        }
      })
      //save item modifiers
  }

  saveItem(updatedItem){
    this.Spinner.show("item-save");
    return this.$q((resolve, reject)=>{
      updatedItem.update()
        .then((item) => {
          item.images = updatedItem.images;
          item.tags = updatedItem.tags;
          item.$size = updatedItem.$size;
          updatedItem = item;
          return updatedItem;
        })
        .then(()=>{
          return this.saveItemExtensions(updatedItem, this.$stateParams.venueId)
        })
        .then(()=>{
          console.log("resolving update item", updatedItem)
          resolve(updatedItem);
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
    console.log("creating item", newItem);
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
          item.$size = newItem.$size;

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
        .then(()=>{
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

  showCreateItem($event, isImport){
    console.log("show creating", $event, isImport);

    let newItem = {
        $selected:true,
        quantity:1,
        $size:0,
        visible:1,
        tags:[],
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

  constructor($scope, $q, Snack, Spinner, $stateParams, UtilsService, contextual) {
    "ngInject";
    this.Snack = Snack;
    this.$stateParams = $stateParams;
    this.Spinner = Spinner;
    this.UtilsService = UtilsService;
    this.$q = $q;
    this.items = this.items === undefined ? [] : this.items;
    this.contextual = contextual;

  }
}
