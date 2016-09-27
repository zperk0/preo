export default class collectionSlotsItemController {
  static get UID(){
    return "collectionSlotsItemController"
  }

  restoreOriginalValues() {

    if (this.originalCollectionSlot){
      angular.extend(this.collectionSlot, this.originalCollectionSlot)
      this.originalCollectionSlot = false;
    }
  }  

  contextualMenuCancel() {

    this.restoreOriginalValues();
    this.collectionSlot.$selected = false;

    if (this.collectionSlot && !this.collectionSlot.id) {
      this.cardItemList.deleteItem(this.collectionSlot);
    }    
  }

  isValidEntity (entity) {

    return entity && entity.name;
  }

  buildEntityToCollectionSlot (entity) {

    this.collectionSlot = entity;
  }

  contextualMenuSuccess(entity){
    if (this.collectionSlot && this.isValidEntity(entity)){
      this.buildEntityToCollectionSlot(entity);

      if (!this.collectionSlot.id){
        this.Spinner.show("collection-slot-create");
        this.collectionSlotsListCtrl.createCollectionSlot(this.collectionSlot)
          .then((_collectionSlot)=>{

            this.collectionSlot.$deleted = false;
            this.collectionSlot.$selected = false;
            
            this.$timeout(() => {

              this.cardItemList.onItemCreated(_collectionSlot);
              this.contextualMenu.hide();
              this.Spinner.hide("collection-slot-create");
              this.Snack.show(this.gettextCatalog.getString('Collection Slot created'));              
            });
          }, (err)=>{
            console.log('error on save collection slot', err);
            this.Spinner.hide("collection-slot-create");
            this.Snack.showError(this.gettextCatalog.getString('Error saving collection slot'));
          })

      } else {
        this.updateCollectionSlot().then(()=>{
          this.contextualMenu.hide();
          this.collectionSlot.$selected = false;
        })
      }
    }
  }  

  updateCollectionSlot(){

    this.Spinner.show("collection-slot-update");
    return this.$q((resolve, reject)=>{
      this.collectionSlot.update()
        .then((_collectionSlot)=>{
          this.Snack.show(this.gettextCatalog.getString('Collection Slot updated'));
          resolve(_collectionSlot);
      },()=>{
        reject();
        this.Snack.showError(this.gettextCatalog.getString('Error updating collection slot'));
      }).then(()=>{
        this.Spinner.hide("collection-slot-update");
      })
    });
  }

  onEdit ($event) {

    this.originalCollectionSlot  = angular.copy(this.collectionSlot);
    this.cardItemList.selectItem(this.collectionSlot);
    this.contextual.showMenu(this.type, this.collectionSlot, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
    $event.stopPropagation();
  }    

  showCannotDeleteSlotDialog () {

    this.DialogService.show(this.ErrorService.COLLECTION_SLOT_SCHEDULE.title, this.ErrorService.COLLECTION_SLOT_SCHEDULE.message, [{
        name: this.gettextCatalog.getString('OK')
      }]);    
  }

  onDelete(){

    this.DialogService.delete(this.LabelService.TITLE_DELETE_COLLECTION_SLOT, this.LabelService.CONTENT_DELETE_COLLECTION_SLOT)
      .then(()=>{
          this.Spinner.show("collection-slot-delete");
          return this.collectionSlot.remove();
      })
      .then(()=>{
        console.log('resr he');
          this.cardItemList.onItemDeleted(this.collectionSlot);
          if (this.onItemDeleted){
            this.onItemDeleted({item:this.collectionSlot});
          }
          this.Snack.show('Collection Slot deleted');
          this.Spinner.hide("collection-slot-delete");
      })
      .catch((err)=>{
        console.log('error on delete,', err);
        this.Spinner.hide("collection-slot-delete")
        
        if (err && err instanceof Object && err.message && err.message.indexOf('schedule') !== -1) {
          this.showCannotDeleteSlotDialog();
        } else {
          this.Snack.showError('Collection slot not deleted');
        }
      });
  }  

  constructor($q, $timeout, Spinner, Snack, contextualMenu, contextual, DialogService, LabelService, ErrorService, gettextCatalog) {
  	"ngInject";

    this.$q = $q;
  	this.$timeout = $timeout;
  	this.Spinner = Spinner;
  	this.Snack = Snack;
  	this.contextualMenu = contextualMenu;
  	this.contextual = contextual;
  	this.DialogService = DialogService;
    this.LabelService = LabelService;
  	this.ErrorService = ErrorService;
  	this.gettextCatalog = gettextCatalog;

  	this.type = 'collectionSlot';

    if (this.collectionSlot && !this.collectionSlot.id) {
        this.contextual.showMenu(this.type, this.collectionSlot, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
    }    
  }
}
