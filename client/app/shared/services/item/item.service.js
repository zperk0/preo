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

          if (item.isVoucher()) {
            image.type = Preoday.constants.MenuItemImageType.BG;
          }

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
    if (newItemData.images) {
      for (let image of newItemData.images) {
        // remove image id to duplicate the image path
        image.id = null;
      }
    }
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

    if (item.$size && item.$size.$isMultiple && item.$size.items.length) {
      item.price = 0;
    }

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

  createItem(item, sectionId){
    
    if (item.$size && item.$size.$isMultiple && item.$size.items.length) {
      item.modifiers = [item.$size];
      item.price = 0;
    }

    this.DEBUG && console.log("creating item", item, sectionId);
    return this._parseImages(item)
      .then(() => {

        return Preoday.Item.save(item, sectionId);
      });
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

  setItemsSizes () {

    for (let i = this.data.items.length; i--;) {
      this.data.items[i].setSize();
    }
  }

  fetchItems(venueId, expand='images,tags,modifiers,customTags,tagActions') {
    return this.$q((resolve, reject)=>{
      Preoday.Item.getAll({venueId:venueId, expand:expand})
      .then((items)=>{
        this.data.items = items || [];

        this.setItemsSizes();

        return this.ModifierService.getModifiers(venueId)
      })
      .then((modifiers)=>{
        // this.populateModifiers(modifiers);
        resolve(this.data)
      })
      .catch((err)=>{
        console.log("Error fetching items", err);
        reject(err);
      });
    });
  }

  getItems(){
    return this.data.items;
  }

  getNewItemBase (venueId, isVoucher) {

    let newItem = new Preoday.Item({
        $id: -1,
        $show: true,
        $selected: true,

        quantity: 1,
        $size: 0,
        visible: 1,
        tags: [],
        images: [],
        modifiers: [],
        position: 0,
        venueId: venueId,

        voucherType: Preoday.constants.VoucherType.NONE
    });

    if (isVoucher) {
      newItem.voucherType = Preoday.constants.VoucherType.EMAIL;
      newItem.hasMessage = 0;
    }

    return newItem;
  }

  addItem (item) {

    this.data.items && this.data.items.push(item);
  }

  hasBasicTabErrors (contextualForm, entity) {

    return  contextualForm
            && contextualForm.$submitted
            &&
            (
              contextualForm.entityName.$invalid
              || (contextualForm.entityPrice && contextualForm.entityPrice.$invalid)
              || (contextualForm.sizeForm && contextualForm.sizeForm.$invalid)
            );
  }

  hasAdvancedTabErrors (contextualForm, entity) {

    return  contextualForm
            && contextualForm.$submitted
            &&
            (
              contextualForm.entityVoucherValue.$invalid
              || (!entity.$voucherTypeEmail && !entity.$voucherTypePost)
            );
  }

  addModifiersToItem (itemId, modifiersToAdd) {

    let item = this.getById(itemId);

    if (!item) {
      return false;
    }

    item.modifiers.push.apply(item.modifiers, modifiersToAdd);

    this.$rootScope.$broadcast(this.BroadcastEvents.ON_ITEM_ADD_MODIFIER + item.id, item);
  }

  removeModifierFromItem (itemId, modifier) {

    let item = this.getById(itemId);

    if (!item) {
      return false;
    }

    let index = item.modifiers.map((mod) => {

      return mod.id;
    }).indexOf(modifier.id);

    if (index !== -1) {
      item.modifiers.splice(index, 1);
    }

    this.$rootScope.$broadcast(this.BroadcastEvents.ON_ITEM_REMOVE_MODIFIER + item.id, item);
  }

  constructor($q, $rootScope, $location, DialogService, LabelService, UtilsService, gettextCatalog, ModifierService, BroadcastEvents) {
    "ngInject";
    this.data = {};
    this.$q =$q;
    this.$rootScope =$rootScope;
    this.DialogService = DialogService;
    this.LabelService = LabelService;
    this.UtilsService = UtilsService;
    this.gettextCatalog = gettextCatalog;
    this.DEBUG = window.DEBUG || $location.search().debug;
    this.ModifierService = ModifierService;
    this.BroadcastEvents = BroadcastEvents;


  }
}
