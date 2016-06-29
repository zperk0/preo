
export default class venueSettingsController {
  static get UID(){
    return "venueSettingsController";
  }

  saveImage(){
    Preoday.ItemImage.saveToCdn(this.image, this.$stateParams.venueId)
    .then((res)=>{
      console.log("saved", res)
    }, ()=>{
      console.log("failed")
    })
  }

  constructor($stateParams) {
    "ngInject";
    this.$stateParams = $stateParams;

  }
}
