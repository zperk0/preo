export default class ItemService {

  static get UID(){
    return "ItemService";
  }

  getItemImage(item){
    if (item.images && item.images.length && !item.images[0].$delete){
      if (item.images[0].$image){
        return this.$q.resolve(item.images);
      }
      return this.UtilsService.getBase64Image(item.images[0].image)
        .then((base64img)=>{
          return [{
            $image:base64img,
            $save:true
          }];
      })
    }
    return this.$q.resolve([]);
  }


  checkMultipleOccurrences(item){
    //only try to prompt if action came from somewhere section related
    if (item.sectionId){
      const buttons = [{name:'All menus', id:'all'}, {name:'Just this menu', id:'single'}]
      return item.getMenus()
        .then((menus)=>{
          if (item.sectionId && menus && menus.length>1){
            return this.DialogService.show(this.LabelService.TITLE_MULTIPLE_INSTANCES, this.LabelService.CONTENT_MULTIPLE_INSTANCES, buttons)
              .then((response)=>{
                return response.id;
              },()=>{
                //if the user pressed escape
                throw "Escape pressed, cancelling update";
            })
          }
          return 'single'
        })
    }
    //if not section related, we came from the item database, skip menu check
    return this.$q.resolve('all');
  }

  _saveItemImages(item){
    if (item.images && item.images.length){
      let img = item.images[0];
      if (img.$save){
        this.DEBUG && console.log("Saving Item images", item.images)
        return Preoday.ItemImage.saveToCdn(img.$image, item.id, item.venueId)
        .then((itemImage)=>{
            if (img.id){ //item  already had image, so don't create new, just update existing
                img.image = itemImage.image;
                return img.update()
              } else {
                return Preoday.ItemImage.save(itemImage);
              }
          })
        .then((newImage)=>{
          item.images[0] = newImage;
          return item
        })
      }
      else if (img.$delete && img.delete){
        // if we have a $image and it's a real image in the list delete it
        return img.delete().then(()=>{
          item.images = [];
          return item;
        })
      }
    }
    this.DEBUG && console.log("Item does not have images")
    return item;
  }

  _saveItemTags(item){
    if (item.tags && item.tags.length){
      this.DEBUG && console.log("Saving new item tags", item.tags)
      return item.updateTags()
        .then((tags)=>{
          return item;
        })
    }
    this.DEBUG && console.log("New item does not have tags")
    return item;
  }

  _saveItemSize(item){
    //if we have sizes save or update
    if (item.$size){
      // if it's not to multiple we need to delete if it exists, the user has chosen a SINGLE item checkbox
      if (!item.$size.$isMultiple && item.$size.id){
        this.DEBUG && console.log("Single checkbox choosen, deleting item sizes", item.$size)
        return item.$size.delete().then(()=>{
          item.$size = false;
          return item;
        })
      }
      //if we actually have a size, update or save
      if(item.$size.items.length){
        this.DEBUG && console.log("Saving item $size", item.$size)
        //if its new, we save.
        if (!item.$size.id){
          item.$size.itemId=item.id;
          return item.saveModifier(item.$size).then((mod)=>{
            item.$size = mod;
            return item;
          })
        }
        //if it's not new we update
        var promises = [];
        //delete each of the individual modifier items
        if (item.$size.$deletedItems && item.$size.$deletedItems.length){
          item.$size.$deletedItems.forEach((modifierItem)=>{
              promises.push(modifierItem.delete());
          });
        }
        //once they're all deleted, update the modifier to change values and create new options
        return this.$q.all(promises)
          .then(item.$size.update.bind(item.$size))
          .then((mod)=>{
            item.$size = mod;
            return item;
        })
      }
    }
    this.DEBUG && console.log("Item does not have $size")
    return item;
  }

  doSingleEdit(item){
    return this.cloneItem(item)
      .then((newItem)=>{
        this.deleteItem(item)
        return newItem;
      })
  }



  cloneItem(item){
    const newItemData = angular.copy(item);
    //remove ids from all necesasry entities to duplicate them. We'll not clone Modifiers but will clone sizes. Images are handled below
    if (newItemData.$size){
      //if we explicitly marked this item as single before cloning, we don't clone sizes;
      if (newItemData.$size.$isMultiple === false){
        newItemData.$size  = false;
      } else{
        delete newItemData.$size.id;
        delete newItemData.$size.itemId;
        newItemData.$size.$isMultiple = newItemData.$size.items && newItemData.$size.items.length > 0;
        newItemData.$size.items.forEach((modifierItem)=>{
          delete modifierItem.id;
          delete modifierItem.modifierId;
        })
      }
    }
    // Cloning an image is more complicated, we need to get the base64 from the current image and repost it
    return this.getItemImage(newItemData)
      .then((images)=>{
        newItemData.images = images;
        return newItemData
      })
      .then(this.createItem.bind(this));
  }

  updateItem(item,action = 'all', skipExtensions = false){
    this.DEBUG && console.log("updating item", item, action, skipExtensions);
    if (action === 'single'){
      //at this point, item param is already with the new data in it so we do a single edit and nothing else is required.
      return this.doSingleEdit(item);
    }
    return item.update()
      .then((updatedItem)=>{
        this.DEBUG && console.log("updated item", updatedItem);
        return updatedItem;
      })
      .then((item)=>{
        if(skipExtensions){
          return item;
        }
       return this._saveItemTags(item)
        .then(this._saveItemImages.bind(this))
        .then(this._saveItemSize.bind(this))
      })
      //TODO update item modifiers
  }

  createItem(item){
    this.DEBUG && console.log("creating item", item);
    return Preoday.Item.save(item)
      .then((newItem)=>{
        this.DEBUG && console.log("created item", newItem);
        return newItem;
      })
      .then(this._saveItemTags.bind(this))
      .then(this._saveItemImages.bind(this))
      .then(this._saveItemSize.bind(this))
      //TODO save item modifiers
      .then((newItem)=>{
        this.items.push(newItem)
        return newItem;
      })
  }

  deleteItem(item){
    if (item.sectionId){
      return Preoday.Section.removeItems([item.id],item.sectionId)
    }
    return item.delete()
      .then(()=>{
        debugger;
        this.items = this.items.filter((i)=>i.id!==item.id)
      })
    //delete from list
  }


  getItems(venueId, expand){
    return this.$q((resolve, reject)=>{

      if (this.items){
        resolve(this.items);
      } else {
        Preoday.Item.getAll({venueId:venueId, expand:expand})
        .then((items)=>{
          this.items = items;
          resolve(items);
        },(err)=>{
          console.log("Error fetching items", err);
          reject(err);
        })
        .catch((err)=>{
          console.log("Error fetching items", err);
          reject(err);
        });
      }
    })
  }



  constructor($q, $rootScope, $location, DialogService, LabelService, UtilsService) {
    "ngInject";
    this.$q =$q;
    this.DialogService = DialogService;
    this.LabelService = LabelService;
    this.UtilsService = UtilsService;
    this.DEBUG = window.DEBUG || $location.search().debug;

  }
}