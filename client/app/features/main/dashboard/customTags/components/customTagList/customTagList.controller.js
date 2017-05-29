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
    
    let customTag = {
      venueId: this.venueId,
      $selected:true,
    };

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

    this.Spinner.show("custom-tag-delete");
    customTag.delete()
      .then(()=>{
        this.Snack.show(this.gettextCatalog.getString('Tag deleted'));

        return this.cardItemList.deleteItem(customTag);
      }).then(()=>{
        this.Spinner.hide("custom-tag-delete");
      }).catch((err)=>{
        this.Spinner.hide("custom-tag-delete");
      });
  }

  /* @ngInject */
  constructor($timeout, $q, Spinner, Snack, gettextCatalog) {
    "ngInject";
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.$q = $q;
    this.$timeout = $timeout;
    this.gettextCatalog = gettextCatalog;
  }
}
