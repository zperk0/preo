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
    const buttons = [{name: this.gettextCatalog.getString('All menus'), id:'all'}, {name: this.gettextCatalog.getString('Just this menu'), id:'single'}]
    return item.getMenus()
      .then((menus)=>{
        if (menus && menus.length>1){
          return this.DialogService.show(this.LabelService.TITLE_MULTIPLE_INSTANCES, this.LabelService.CONTENT_MULTIPLE_INSTANCES, buttons)
            .then((response)=>{
              return response.id;
            },()=>{
              //if the user pressed escape
              throw "Escape pressed, cancelling update";
          })
        }
        return 'all'
      })
  }

  _parseImages(item){

    if (item.images && item.images.length) {
      let promises = [];

      for (var i = item.images.length - 1; i >= 0; i--) {
        let image = item.images[i];
        let deferred = this.$q.defer();

        promises.push(deferred.promise);

        ((image, deferred) => {

          if (!image.$save) {
            return deferred.resolve();
          }

          Preoday.ItemImage.saveToCdn(image.$image, item.id, item.venueId)
          .then((itemImage)=>{

            angular.extend(image, itemImage);
            deferred.resolve();
          }, deferred.reject);
        })(image, deferred);
      }

      return this.$q.all(promises);
    }

    return this.$q.when(item);


    // if (item.images && item.images.length){
    //   let img = item.images[0];
    //   if (img.$save){
    //     this.DEBUG && console.log("Saving Item images", item.images)
    //     return Preoday.ItemImage.saveToCdn(img.$image, item.id, item.venueId)
    //     .then((itemImage)=>{
    //         if (img.id){ //item  already had image, so don't create new, just update existing
    //             img.image = itemImage.image;
    //             return img.update()
    //           } else {
    //             return Preoday.ItemImage.save(itemImage);
    //           }
    //       })
    //     .then((newImage)=>{
    //       item.images[0] = newImage;
    //       return item
    //     })
    //   }
    //   else if (img.$delete && img.delete){
    //     // if we have a $image and it's a real image in the list delete it
    //     return img.delete().then(()=>{
    //       item.images = [];
    //       return item;
    //     })
    //   }
    // }
    // this.DEBUG && console.log("Item does not have images")
    // return this.$q.resolve(item);
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
      if(item.$size.$isMultiple && item.$size.items.length) {
        this.DEBUG && console.log("Saving item $size", item.$size)
        //if its new, we save.
        if (!item.$size.id) {
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
              if (modifierItem.id){
                promises.push(modifierItem.delete());
              }
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

  doSingleEdit(item, sectionId, position){
    return this.cloneItem(item, sectionId, position)
      .then((newItem)=>{
        this.removeFromSection(item, sectionId)
        return newItem;
      })
  }



  cloneItem(item, sectionId, position){
    const newItemData = angular.copy(item);
    newItemData.position = position;
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
    return this.createItem(newItemData, sectionId)
  }

  updateItem(item, skipExtensions = false){
    this.DEBUG && console.log("updating item", item, skipExtensions);

    return (skipExtensions ? this.$q.when() : this._parseImages(item))
      .then(item.update.bind(item))
      .then((updatedItem)=>{
        this.DEBUG && console.log("updated item", updatedItem);
        return updatedItem;
      })
      .then((item)=>{
        if(skipExtensions){
          return item;
        }
        return this._saveItemSize(item);
      })
      .then((item)=>{
        //update the list of items with this new record
        for (let i=0;i<this.data.items.length;i++){
          if (this.data.items[i].id === item.id){
            this.data.items[i] = item;
            break;
          }
        }
        return item;
      });
  }

  createItem(item, sectionId) {

    if (item.$size && item.$size.items.length) {
      item.modifiers = [item.$size];
    }
    
    this.DEBUG && console.log("creating item", item, sectionId);
    return this._parseImages(item)
      .then(() => {

        return Preoday.Item.save(item, sectionId);
      })
      // .then((newItem)=>{
      //   console.log('created', newItem);
      //   this.DEBUG && console.log("created item", newItem);
      //   return newItem;
      // })
      // .then(this._saveItemImages.bind(this))
      // .then(this._saveItemSize.bind(this))
      // .then((newItem)=>{
        // let positionedItem =  {item:newItem, id:newItem.id};

        //if this item was created in the menu section editor the list is not going to be refreshed automagically
        // if (sectionId){
        //   positionedItem.position = newItem.position;

        //   this.data.items.push(newItem);
        // }

      //   console.log('new item here', newItem);
      //   return newItem;
      // })
  }

  removeFromSection(item, sectionId){
      return Preoday.Section.removeItems([item.id],sectionId)
  }

  deleteItem(item){
    return item.delete()
      .then(()=>{
        this.data.items = this.data.items.filter((i)=>i.id!==item.id)
      })
  }

  getByIds(ids){
    return this.data.items.filter((i)=>ids.indexOf(i.id)>-1)
  }
  getById(id){
    return this.data.items.filter((i)=>id===i.id)[0];
  }

  populateModifiers(modifiers){
    this.data.items.forEach((i)=>{
      i.modifiers = this.ModifierService.getByIds(i.modifiers.map((m)=>m.id));
    })
  }


  getItems(venueId, expand='images,tags,modifiers'){
    return this.$q((resolve, reject)=>{
      if (this.data.items){
        resolve(this.data);
      } else {
        Preoday.Item.getAll({venueId:venueId, expand:expand})
        .then((items)=>{
          this.data.items = items || [];
          return this.ModifierService.getModifiers(venueId)
        })
        .then((modifiers)=>{
          this.populateModifiers(modifiers);
          resolve(this.data)
        })
        .catch((err)=>{
          console.log("Error fetching items", err);
          reject(err);
        });
      }
    })
  }

  getNewItemBase (venueId) {

    let newItem = {
        $id: -1,
        $show: true,
        $selected: true,

        quantity: 1,
        $size: 0,
        visible: 1,
        tags: [],
        images: [],
        position: 0,
        venueId: venueId
    };   
    
    return newItem; 
  }

  addItem (item) {

    this.data.items && this.data.items.push(item);
  }

  constructor($q, $rootScope, $location, DialogService, LabelService, UtilsService, gettextCatalog, ModifierService) {
    "ngInject";
    this.data = {};
    this.$q =$q;
    this.DialogService = DialogService;
    this.LabelService = LabelService;
    this.UtilsService = UtilsService;
    this.gettextCatalog = gettextCatalog;
    this.DEBUG = window.DEBUG || $location.search().debug;
    this.ModifierService = ModifierService;


  }
}
