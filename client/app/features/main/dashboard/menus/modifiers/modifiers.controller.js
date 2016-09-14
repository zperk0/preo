
export default class modifiersController {
  static get UID(){
    return "modifiersController"
  }
  constructor(ModifierService, FeatureService, $stateParams) {
    "ngInject";

    FeatureService.hasFeature(Preoday.constants.Feature.NESTED_MODIFIER);

    ModifierService.getModifiers($stateParams.venueId).then((data)=>{
      console.log("got data", data)
      this.data = data;
    })

  }
}
