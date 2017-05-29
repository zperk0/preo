export default class customTagController {
  static get UID(){
    return "customTagController"
  }

  restoreOriginalValues(){
    if (this.originalCustomTag){
      angular.extend(this.customTag, this.originalCustomTag)
      this.originalCustomTag = false;
    }
  }  

  contextualMenuCancel(){
    this.restoreOriginalValues();
    this.customTag.$selected = false;

    if (this.customTag && !this.customTag.id) {
      this.cardItemList.deleteItem(this.customTag);
    }    
  }

  contextualMenuSuccess(entity){
    if (this.customTag && entity && entity.name){
      this.customTag = entity;

      if (!this.customTag.id){
        this.Spinner.show("custom-tag-create");
        this.customTagListCtrl.createCustomTag(this.customTag)
          .then((_customTag)=>{

            this.customTag.$deleted = false;
            this.customTag.$selected = false;
            
            this.$timeout(() => {

              this.cardItemList.onItemCreated(_customTag);
              this.contextualMenu.hide();
              this.Spinner.hide("custom-tag-create");
              this.Snack.show(this.gettextCatalog.getString('Tag created'));              
            });
          }, (err)=>{
            console.log('error on save custom tag', err);
            this.Spinner.hide("custom-tag-create");
            this.Snack.showError(this.gettextCatalog.getString('Error saving tag'));
          })

      } else {
        this.updateCustomTag().then(()=>{
          this.contextualMenu.hide();
          this.customTag.$selected = false;
        })
      }
    }
  }  

  updateCustomTag(){

    this.Spinner.show("custom-tag-update");
    return this.$q((resolve, reject)=>{
      this.customTag.update()
        .then((o)=>{
          this.Snack.show(this.gettextCatalog.getString('Custom tag updated'));
          resolve(o);
      },()=>{
        reject();
        this.Snack.showError(this.gettextCatalog.getString('Error updating custom tag'));
      }).then(()=>{
        this.Spinner.hide("custom-tag-update");
      })
    });
  }

  onEdit ($event) {

    if (this.customTag.menus && this.customTag.menus.length) {
      this.customTag.$menuId = this.customTag.menus[0].id;
    }

    this.originalCustomTag  = angular.copy(this.customTag);
    this.cardItemList.selectItem(this.customTag);
    this.contextual.showMenu(this.type, this.customTag, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
    $event.stopPropagation();
  }    

  onDelete(){

    this.Spinner.show("custom-tag-delete");
    
    this.customTag.canDelete()
      .then(response => {
        if (response) {
          this.DialogService.delete(this.LabelService.TITLE_DELETE_TAG, this.LabelService.CONTENT_DELETE_TAG)
            .then(()=>{
              this.contextual.hide();
              this.customTagListCtrl.deleteCustomTag(this.customTag);
            });
        } else {
          this.DialogService.show(this.ErrorService.TAG_IN_USE.title, this.ErrorService.TAG_IN_USE.message, [{
              name: this.LabelService.CONFIRMATION
            }]);
        }
        this.Spinner.hide("custom-tag-delete");
      }, err => {
        console.log('error fetching tag /candelete', err);
        this.Spinner.hide("custom-tag-delete");
      });
  }  

  constructor($q, $timeout, Spinner, Snack, contextualMenu, contextual, MenuService, DialogService, LabelService, ErrorService, gettextCatalog) {
  	"ngInject";

    this.$q = $q;
  	this.$timeout = $timeout;
  	this.Spinner = Spinner;
  	this.Snack = Snack;
  	this.contextualMenu = contextualMenu;
  	this.contextual = contextual;
  	this.DialogService = DialogService;
  	this.LabelService = LabelService;
    this.MenuService = MenuService;
    this.ErrorService = ErrorService;
  	this.gettextCatalog = gettextCatalog;

  	this.type = 'customTag';

    if (this.customTag && !this.customTag.id) {
        this.contextual.showMenu(this.type, this.customTag, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
    }    
  }
}
