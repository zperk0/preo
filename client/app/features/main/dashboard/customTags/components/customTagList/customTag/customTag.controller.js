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
        if (this.customTagListCtrl.checkExistentName(entity.name)) {
          this.DialogService.show(this.LabelService.TITLE_DUPLICATED_TAG_NAME, this.LabelService.CONTENT_DUPLICATED_TAG_NAME, [{
              name: this.LabelService.CREATE
            }], {
              hasCancel: true
            })
            .then(()=>{
              this.createCustomTag();
            });
        } else {
          this.createCustomTag();
        }
      } else {
        this.updateCustomTag().then(()=>{
          this.contextualMenu.hide();
          this.customTag.$selected = false;
        })
      }
    }
  }  

  createCustomTag(){
    this.Spinner.show("custom-tag-create");
    this.customTagListCtrl.createCustomTag(this.customTag)
      .then((_customTag)=>{

        this.customTag.$deleted = false;
        this.customTag.$selected = false;
        
        this.$timeout(() => {

          this.cardItemList.onItemCreated(_customTag);
          this.contextualMenu.hide();
          this.Spinner.hide("custom-tag-create");
          this.Snack.show(this.LabelService.SNACK_TAG_CREATED);
        });
      }, (err)=>{
        console.log('error on save custom tag', err);
        this.Spinner.hide("custom-tag-create");
        this.Snack.showError(this.LabelService.SNACK_TAG_CREATED_ERROR);
      });
  }

  updateCustomTag(){

    this.Spinner.show("custom-tag-update");
    return this.$q((resolve, reject)=>{
      this.customTag.update()
        .then((o)=>{
          this.Snack.show(this.LabelService.SNACK_TAG_UPDATED);
          resolve(o);
      },()=>{
        reject();
        this.Snack.showError(this.LabelService.SNACK_TAG_UPDATED_ERROR);
      }).then(()=>{
        this.Spinner.hide("custom-tag-update");
      })
    });
  }

  onEdit ($event) {

    this.originalCustomTag  = angular.copy(this.customTag);
    this.cardItemList.selectItem(this.customTag);
    this.contextual.showMenu(this.type, this.customTag, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
    $event.stopPropagation();
  }    

  onDelete(){
    this.contextual.hide();
    this.customTagListCtrl.deleteCustomTag(this.customTag);
  }
  
  constructor($q, $timeout, Spinner, Snack, contextualMenu, contextual, DialogService, LabelService, ErrorService) {
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

  	this.type = 'customTag';

    if (this.customTag && !this.customTag.id) {
        this.contextual.showMenu(this.type, this.customTag, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
    }    
  }
}
