export default class userCardController {
  static get UID(){
    return "userCardController"
  }


  addCard(newToken){
    this.originalCard = angular.copy(this.card);
    this.card = {accountId:this.StateService.account.id, token:newToken}
    this.showForm=true;
  }

  cancel() {
    this.showForm=false;
    this.card = angular.copy(this.originalCard);
  }

  submit () {

    if (this.userCardForm.$invalid) {
      return;
    }
    this.Spinner.show('user-card');
    this.StateService.account.updateCard(this.card)
      .then((newCard)=>{
        this.card = newCard;
        this.originalCard = newCard;
        this.showForm = false
        this.Snack.show("Card saved");
        this.Spinner.hide('user-card');
      }, (err)=>{
        console.log("error", err)
        this.Spinner.hide('user-card');
        if (err && err.message){
          this.Snack.showError(err.message);
        } else {
          this.Snack.showError("Card not saved");
        }
      }).catch((err)=>{
        console.log("showError", err)
        this.Spinner.hide('user-card');
        this.Snack.showError("Card not saved");
      });
  }

  /* @ngInject */
  constructor(Spinner, Snack, $timeout, StateService) {
  	'ngInject';

    this.Spinner = Spinner;
    this.Snack = Snack;
    this.StateService = StateService;
    this.$timeout = $timeout;
    this.showForm = false;
  }
}
