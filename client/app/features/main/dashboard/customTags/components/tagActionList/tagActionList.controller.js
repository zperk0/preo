export default class tagActionListController {
  static get UID(){
    return "tagActionListController"
  }

  showCreateTagAction(){

    let isCreating = this.tagActions.filter(item => {

      return !item.id;
    }).length;

    if (isCreating){
      console.log("Already showing new tag action");
      return;
    }

    let tagAction = new Preoday.CustomTagAction({
      venueId: this.StateService.venue.id,
      $selected:true,
    });

    this.tagActions.push(tagAction);
  }

  createTagAction(newData){

    let deferred = this.$q.defer();

    Preoday.CustomTagAction.create(newData)
      .then((tagAction)=>{

        deferred.resolve(tagAction);
      }, (err) => {
        console.log('error creating tag action', err);
        deferred.reject(err);
      });

    return deferred.promise;
  }

  deleteTagAction(tagAction){

    this.Spinner.show("tag-action-delete");
    tagAction.remove()
      .then(()=>{
        this.Snack.show(this.LabelService.SNACK_TAG_ACTION_DELETED);

        return this.cardItemList.deleteItem(tagAction);
      }).then(()=>{
        this.Spinner.hide("tag-action-delete");
      }).catch((err)=>{
        this.Spinner.hide("tag-action-delete");
      });
  }

  /* @ngInject */
  constructor($timeout, $q, Spinner, Snack, LabelService, StateService) {
    "ngInject";
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.$q = $q;
    this.$timeout = $timeout;
    this.LabelService = LabelService;
    this.StateService = StateService;

    this.tagActions = this.tagActions || [];
  }
}
