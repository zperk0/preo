export default class customTagListController {
  static get UID(){
    return "customTagListController"
  }

  showCreateCustomTag(){

    let isCreating = this.customTags.filter(item => {

      return !item.id;
    }).length;
    
    if (isCreating){
      console.log("Already showing new custom tag");
      return;
    }
    
    let customTag = new Preoday.CustomTag({
      venueId: this.venueId,
      $selected:true,
    });

    this.customTags.push(customTag);
  }  

  createCustomTag(newData){

    let deferred = this.$q.defer();

    Preoday.CustomTag.create(newData)
      .then((customTag)=>{
        
        deferred.resolve(customTag);
      }, (err) => {
        console.log('error creating custom tag', err);
        deferred.reject(err);
      });

    return deferred.promise;
  }   

  deleteCustomTag(customTag){

    this.tryDeleteCustomTag(customTag)
      .then(success => {

        this.Snack.show(this.LabelService.SNACK_TAG_DELETED);
        return this.cardItemList.deleteItem(customTag);
      }, error => {

        if (error && error instanceof Object) {
          this.Snack.show(this.LabelService.SNACK_TAG_DELETED_ERROR);
        }
      });
  }

  tryDeleteCustomTag(customTag) {
    let deferred = this.$q.defer();

    this.Spinner.show("custom-tag-candelete");
    
    customTag.canDelete()
      .then(canDelete => {
        this.Spinner.hide("custom-tag-candelete");
        
        return this.confirmDeleteCustomTag(deferred, customTag, this.LabelService.TITLE_DELETE_TAG, this.LabelService.CONTENT_DELETE_TAG);
      }, error => {
        this.Spinner.hide("custom-tag-candelete");
        
        if (!error || !(error instanceof Object)) {
          return reject(error);
        }

        return this.confirmDeleteCustomTag(deferred, customTag, this.LabelService.TITLE_DELETE_TAG_IN_USE, this.LabelService.CONTENT_DELETE_TAG_IN_USE);
      });

    return deferred.promise;
  }

  confirmDeleteCustomTag(deferred, customTag, title, content) {
    this.DialogService.delete(title, content)
      .then(response => {
        this.Spinner.show("custom-tag-delete");
        
        return customTag.remove()
          .then(response => {
            this.Spinner.hide("custom-tag-delete");
            
            deferred.resolve(response);
          }, err => {
            this.Spinner.hide("custom-tag-delete");
            
            deferred.reject(err);
          }).catch((e) => {
            this.Spinner.hide("custom-tag-delete");
            
            deferred.reject(e);
          });
      }, error => {
        deferred.reject(error);
      });
  }

  checkExistentName(name) {
    let findName = this.customTags.filter(tag => {
      return tag.name.trim() == name.trim();
    });

    return findName.length > 1;
  }

  /* @ngInject */
  constructor($timeout, $q, Spinner, Snack, LabelService, DialogService) {
    "ngInject";
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.$q = $q;
    this.$timeout = $timeout;
    this.LabelService = LabelService;
    this.DialogService = DialogService;

    this.customTags = this.customTags || [];
  }
}
