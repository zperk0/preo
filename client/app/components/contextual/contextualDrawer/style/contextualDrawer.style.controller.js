export default class contextualDrawerStyleController {
  static get UID(){
    return "ContextualDrawerStyle";
  }

  _restoreImages(){
    this.model.$images = {
      logoImage: this.model.logoImage ? [{image:this.model.logoImage}] : [],
      bannerImage: this.model.bannerImage ? [{image:this.model.bannerImage}] : [],
      backgroundImage: this.model.backgroundImage ? [{image:this.model.backgroundImage}] : []
    }
  }

  _saveImages() {
    var promises = []
    angular.forEach(this.model.$images,(imageObject, key)=>{
      let img = imageObject[0];
      if (img){
        if (img.$save) {
          let p = Preoday.VenueImage.saveToCdn(img.$image, this.$stateParams.venueId)
            .then((itemImage) => {
              this.model[key] = itemImage.image;
          })
          promises.push(p);
        }
        else if (img.$delete) {
          this.model[key] = null;
        }
      }
    })
    if (promises.length === 0){
      console.log("Item does not have images")
    }
    return this.$q.all(promises);
  }

  onImageUpload(key, image){
    if (key && image){
      if (image.$delete || !image.$image){
        this.model[key] = '';
      } else if (image.$image){
        this.model[key] = image.$image;
      }
    }
  }

  saveSettings(){
  this.Spinner.show('style-saving');
  return this._saveImages()
    .then(()=>{
          if (this.model.venueId){
          this.model.primaryColourHover = this.model.primaryColour;
          return this.model.update(); //Preoday.VenueWebSettings.update()
        } else {
          this.model.primaryColourHover = this.model.primaryColour;
          return Preoday.VenueWebSettings.save(this.model, this.$stateParams.venueId)
            .then((webSettings)=>{
              this.model = webSettings
            })
        }
    })
  }


  saveAndClose(){
    return this.saveSettings().then(()=>{
      this.Spinner.hide('style-saving');
      this.Snack.show(this.LabelService.SNACK_WEBSETTINGS_SUCCESS)
      this.originalModel = angular.copy(this.model);
      return this.close();
    }).catch(()=> {
      this.Spinner.hide('style-saving');
      this.Snack.showError(this.LabelService.SNACK_WEBSETTINGS_ERROR)
    });
  }

  close(){
    this.model = this.originalModel;
    return this.contextualDrawer.close();
  }

  toggleExpanded(style){
    let match =  this.styles.filter((i)=> i.id === style.id)[0];

    if (match && !match.expanded){
      // this.styles.forEach((i)=>{ //collapse all
      //   i.expanded = false;
      // })
      // this.$timeout(()=>{ //timeout for animation
      this.styles.forEach((i)=>{ //collapse all
        i.expanded = i.id === style.id;
      })
      // })
    }

  }

  restoreSearch(){
    let preselected = this.$location.search()['drawer-style'];
    if (preselected){
      this.toggleExpanded({id:preselected})
    }
  }

  getWebSettings(){
    return Preoday.VenueWebSettings.get(this.$stateParams.venueId)
      .then((webSettings)=>{
        this.model = webSettings;
        this.Spinner.hide('style-drawer');
      },()=>{ //api returns 404 if not found
        this.model = {}
        this._restoreImages()
        this.Spinner.hide('style-drawer');
      }).catch((err)=>{
        console.log("err", err)
      })
  }

  dispatchChange(){
    console.log("dispatching change", this.model,window._PREO_DATA._WEBORDERS);
    var $iframe = document.querySelector('iframe');
    if($iframe){
      document.querySelector('iframe').contentWindow.postMessage(this.model,window._PREO_DATA._WEBORDERS);
    }

  }



  constructor($q, $scope, $mdSidenav, Spinner, Snack, $stateParams, contextualDrawer, $location, $timeout, gettextCatalog, $rootScope, LabelService) {
    "ngInject";
    this.$q = $q;
    this.LabelService = LabelService;
    this.contextualDrawer = contextualDrawer;
    Spinner.show('style-drawer');
    this.$stateParams = $stateParams;

    this.getWebSettings().then(()=>{
      this._restoreImages();
      this.originalModel = angular.copy(this.model);
      $scope.$watch('drawerStyleCtrl.model',(value)=>{
        this.dispatchChange();
      }, true);

      $scope.$watch('drawerStyleCtrl.model.$images',(value)=>{
        this.dispatchChange();
      }, true);
    })
    this.$mdSidenav = $mdSidenav;
    this.$scope = $scope;
    this.$location = $location;
    this.$timeout = $timeout;
    this.Spinner = Spinner;
    this.Snack = Snack;



    this.styles = [
    {
      id:"NAVBAR",
      name:gettextCatalog.getString("Navigation")
    },{
      id:"HEADER",
      name:gettextCatalog.getString("Header")
    },{
      id:"LOGO",
      name:gettextCatalog.getString("Logo")
    },{
      id:"PRIMARY",
      name:gettextCatalog.getString("Buttons and section names")
    },{
      id:"SECTIONS",
      name:gettextCatalog.getString("Buttons Background")
    },{
      id:"BACKGROUND",
      name:gettextCatalog.getString("Page Background")
    }]

    $rootScope.$on('$locationChangeSuccess', (event)=>{
      this.restoreSearch();
    })

    this.restoreSearch();

  }
}
