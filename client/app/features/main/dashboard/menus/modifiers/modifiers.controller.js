
export default class modifiersController {
  static get UID(){
    return "modifiersController"
  }

  hasNestedModifierFeature () {

    return this.FeatureService.hasNestedModifierFeature();
  }

  constructor(ModifierService, FeatureService, $stateParams) {
    "ngInject";

    this.FeatureService = FeatureService;

    FeatureService.hasFeature(Preoday.constants.Feature.NESTED_MODIFIER);

    ModifierService.getModifiers($stateParams.venueId).then((data)=>{
      console.log("got data", data)
      this.data = data;
    })

  }
}
