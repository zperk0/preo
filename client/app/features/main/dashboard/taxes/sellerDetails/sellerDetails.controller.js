
export default class sellerDetailsController {
  static get UID(){
    return "sellerDetailsController"
  }

  saveNewSettings(){
    return Preoday.VenueTaxSettings.save(angular.extend({},this.taxSettings, {venueId:this.$stateParams.venueId})); //extend so if this fails for any reason it still triggers a save instead of update
  }

  updateSettings(){
    return this.taxSettings.update();
  }

  saveOrUpdate(){
    return this.taxSettings.venueId ? this.updateSettings.bind(this) : this.saveNewSettings.bind(this);
  }

  submit(){
    this.Spinner.show("seller-details-save");
    var saveOrUpdate = this.saveOrUpdate();
    if (this.sellerForm.$valid){
      saveOrUpdate()
        .then((taxSettings)=>{
          this.taxSettings = taxSettings
          this.toggleEdit();
          this.Spinner.hide("seller-details-save");
          this.Snack.show(this.LabelService.SNACK_SELLER_SUCCESS)
        }, (err)=>{
          console.log("seller-details" ,err);
          this.Spinner.hide("seller-details-save");
          this.Snack.showError(this.LabelService.SNACK_SELLER_ERROR)
        }).catch((err)=>{
          console.log("seller-details",err)
          this.Spinner.hide("seller-details-save");
          this.Snack.showError(this.LabelService.SNACK_SELLER_ERROR)
        })
    }
    return saveOrUpdate;
  }

  toggleEdit(){
    this.isEdit = !this.isEdit;
  }

  init(){
    this.Spinner.show("seller-details");
    return Preoday.VenueTaxSettings.get(this.$stateParams.venueId)
      .then((taxSettings)=>{
        this.taxSettings = taxSettings;
        this.Spinner.hide("seller-details");
      }, (err)=>{
        if (err && err.status && err.status == 404){
          this.taxSettings = new Preoday.VenueTaxSettings();
        } else {
          this.showError();
        }
        this.Spinner.hide("seller-details");
      })
  }

  showError(){
    this.$timeout(()=>{
      this.isError = true;
      this.Spinner.hide("seller-details");
    })
  }

  /* @ngInject */
  constructor(Spinner, Snack, $stateParams, ErrorService, LabelService, $timeout) {
    "ngInject";
    this.isEdit = false;
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.$stateParams = $stateParams;
    this.ErrorService = ErrorService;
    this.LabelService = LabelService;
    this.isError = false;
    this.$timeout = $timeout;
    this.init();
  }
}

