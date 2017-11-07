
export default class modifiersController {
  static get UID(){
    return "modifiersController"
  }

  showSpinner(){
    this.Spinner.show("modifiers-list");
  }

  hideSpinner(){
    this.Spinner.hide("modifiers-list");
  }

  hasNestedModifierFeature () {

    return this.FeatureService.hasNestedModifierFeature();
  }

  constructor(ModifierService, FeatureService, Spinner, $stateParams, StateService) {
    "ngInject";

    this.FeatureService = FeatureService;
    this.Spinner = Spinner;

    this.showSpinner();

    FeatureService.hasFeature(Preoday.constants.Feature.NESTED_MODIFIER);

    ModifierService.getModifiers(StateService.venue.id).then((data)=>{
      console.log("got data", data)
      this.data = data;

      this.hideSpinner();
    }, () => {

      this.hideSpinner();
    });

  }
}
