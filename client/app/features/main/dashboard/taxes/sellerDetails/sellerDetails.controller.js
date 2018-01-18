
export default class sellerDetailsController {
  static get UID(){
    return "sellerDetailsController"
  }

  onCreate() {
    // Pre populate taxName with default value
    this.taxSettings.taxName = this.gettextCatalog.getString('VAT Number');
    return Preoday.TaxSettings.save(this.taxSettings);
  }

  onUpdate() {
    return this.taxSettings.update();
  }

  onSave() {
    return this.taxSettings.$editing
      ? this.onUpdate.bind(this)
      : this.onCreate.bind(this);
  }

  onPublish() {
    console.log('[SellerDetailsCtrl] onPublish', this.selected);
  }

   debounce(func, wait, immediate) {
      console.log("debouncing");
      return () => {
        var context = this, args = arguments;
        var later = function() {
          context.debounceTimeout = null;
          console.log("in later", immediate)
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !context.debounceTimeout;
        clearTimeout(context.debounceTimeout);
        context.debounceTimeout = setTimeout(later, wait);
        console.log("if call now", callNow);
        if (callNow) func.apply(context, args);
      };
    };

    debounceUpdate(){
      this.sellerForm.$setSubmitted();
      this.isSaving = true;
      if (this.sellerForm.$valid){
        this.debounce(this.doUpdate.bind(this), 1000)()
      } else {
        this.$timeout(()=>{ //in a timeout to prevent super fast results
          this.isSaving = false;
          this.isError = true;
        }, 500)
      }
    }

  doUpdate(){
    const onSave = this.onSave();
    try {
        onSave()
        .then((taxSettings)=>{
          angular.extend(this.taxSettings,taxSettings);
          this.taxSettings.$editing = true;

          this.$timeout(()=>{
              this.isSaving = false;
              this.isError = false;
            })
          }).catch((err)=>{
            console.error(err)
            this.$timeout(()=>{
              this.isSaving = false;
              this.isError = true;
            })
          })
      } catch(e){
        console.error(e)
        this.$timeout(()=>{
          this.isSaving = false;
          this.isError = true;
        })
      }
    return onSave;
  }

  init() {
    const {StateService, Spinner} = this;

    let params = null;
    if (StateService.isChannel) {
      params = {channelId: StateService.channel.id};
    } else {
      params = {venueId: StateService.venue.id};
    }

    Spinner.show('seller-details');
    Preoday.TaxSettings.findOne(params)
      .then(data => {
        this.taxSettings = data;
        this.taxSettings.$editing = true;
        Spinner.hide('seller-details');
      })
      .catch(err => {
        Spinner.hide('seller-details');
        if (err && err.status && err.status == 404) {
          this.taxSettings = new Preoday.TaxSettings();
          angular.extend(this.taxSettings, params);
        } else {
          this.showError();
        }
      });
  }

  showError(){
    this.$timeout(()=>{
      this.showError = true;
      this.Spinner.hide("seller-details");
    })
  }

  /* @ngInject */
  constructor(Spinner, Snack, $stateParams, ErrorService, LabelService, $timeout, gettextCatalog, StateService, entities) {
    "ngInject";
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.$stateParams = $stateParams;
    this.ErrorService = ErrorService;
    this.LabelService = LabelService;
    this.StateService = StateService;
    this.$timeout = $timeout;
    this.gettextCatalog = gettextCatalog;

    // Defaults
    this.showError = false;
    this.isError = false;
    this.isSaving = false;
    this.isChannel = StateService.isChannel;
    this.debounceTimeout = null;

    // Entities
    this.entities = entities;
    this.entities.channel = StateService.channel;
    this.selected = {channelId: null, groupIds: [], venueIds: []};
    this.init();
  }
}
