export default class promotionController {
  static get UID(){
    return "promotionController"
  }

  isPaused(){
    console.log(" is paused?",this.promotion.active)
    return !this.promotion.active;
  }

  updatePromotion(){
    this.Spinner.show("updating-promotion");
    //this.promotion.update().then(
    this.$timeout(
      ()=>{
        this.Spinner.hide('updating-promotion')
        console.log("promotion-saved",this.promotion)
      },1000)
  }

  onPause(newStatus){
    console.log("on pause", newStatus, arguments);
    this.promotion.active = newStatus ? 1 : 0;
    this.updatePromotion();
  }

  /* @ngInject */
  constructor(Spinner, Snack,$timeout) {
    "ngInject";
    this.title = "I am a promotion component"
    this.Spinner = Spinner;
    this.$timeout = $timeout;
    this.Snack = Snack;
  }
}
