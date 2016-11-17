
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

   debounce(func, wait, immediate) {
      console.log("debouncing");
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          console.log("in later", immediate)
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
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
    var saveOrUpdate = this.saveOrUpdate();
    try {
        saveOrUpdate()
        .then((taxSettings)=>{
          angular.extend(this.taxSettings,taxSettings);
          this.$timeout(()=>{
              this.isSaving = false;
              this.isError = false;
            })
          }, (err)=>{
            console.error(err)
            this.$timeout(()=>{
              this.isSaving = false;
              this.isError = true;
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
    return saveOrUpdate;
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
      this.showError = true;
      this.Spinner.hide("seller-details");
    })
  }

  /* @ngInject */
  constructor(Spinner, Snack, $stateParams, ErrorService, LabelService, $timeout) {
    "ngInject";
    this.showError = false;
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.$stateParams = $stateParams;
    this.ErrorService = ErrorService;
    this.LabelService = LabelService;
    this.isError = false;
    this.isSaving = false;
    this.$timeout = $timeout;
    this.init();
  }
}

