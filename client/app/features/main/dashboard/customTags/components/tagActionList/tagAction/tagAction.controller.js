export default class tagActionController {
  static get UID(){
    return "tagActionController"
  }

  restoreOriginalValues(){
    if (this.originalTagAction){
      angular.extend(this.tagAction, this.originalTagAction)
      this.originalTagAction = false;
    }
  }  

  contextualMenuCancel(){
    this.restoreOriginalValues();
    this.tagAction.$selected = false;

    if (this.tagAction && !this.tagAction.id) {
      this.cardItemList.deleteItem(this.tagAction);
    }
  }

  contextualMenuSuccess(entity){
    if (this.tagAction && entity && entity.name && entity.triggerType && entity.frequencyType){
      this.tagAction = entity;

      if (!this.tagAction.id){
        this.createTagAction();
      } else {
        this.updateTagAction().then(()=>{
          this.contextualMenu.hide();
          this.tagAction.$selected = false;
        })
      }
    }
  }  

  createTagAction(){
    this.Spinner.show("custom-tag-create");
    this.tagActionListCtrl.createTagAction(this.tagAction)
      .then((_tagAction)=>{

        this.tagAction.$deleted = false;
        this.tagAction.$selected = false;
        
        this.$timeout(() => {

          this.cardItemList.onItemCreated(_tagAction, true);
          this.contextualMenu.hide();
          this.Spinner.hide("custom-tag-create");
          this.Snack.show(this.LabelService.SNACK_TAG_ACTION_CREATED);
        });
      }, (err)=>{
        console.log('error on save custom tag', err);
        this.Spinner.hide("custom-tag-create");
        this.Snack.showError(this.LabelService.SNACK_TAG_ACTION_CREATED_ERROR);
      });
  }

  updateTagAction(){

    this.Spinner.show("custom-tag-update");
    return this.$q((resolve, reject)=>{
      this.tagAction.update()
        .then((o)=>{
          this.Snack.show(this.LabelService.SNACK_TAG_ACTION_UPDATED);
          resolve(o);
      },()=>{
        reject();
        this.Snack.showError(this.LabelService.SNACK_TAG_ACTION_UPDATED_ERROR);
      }).then(()=>{
        this.Spinner.hide("custom-tag-update");
      })
    });
  }

  onEdit ($event) {

    this.originalTagAction  = angular.copy(this.tagAction);
    this.cardItemList.selectItem(this.tagAction);
    this.contextual.showMenu(this.type, this.tagAction, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this), {
      tagGroups: this.tagActionListCtrl.tagGroups
    });
    $event.stopPropagation();
  }    

  onDelete(){

    this.DialogService.delete(this.LabelService.TITLE_DELETE_TAG_ACTION, this.LabelService.CONTENT_DELETE_TAG_ACTION)
      .then(()=>{
        this.contextual.hide();
        this.tagActionListCtrl.deleteTagAction(this.tagAction);
      });
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

  	this.type = 'tagAction';

    $timeout(() => {
      if (this.tagAction && !this.tagAction.id) {
        this.contextual.showMenu(this.type, this.tagAction, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this), {
          tagGroups: this.tagActionListCtrl.tagGroups
        });
      }
    });
  }
}
