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

  saveSettings(){

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
      return this.close();
    });
  }

  close(){
    return this.contextualDrawer.close();
  }

  toggleExpanded(style){
    this.styles.forEach((i)=>{
      i.expanded = i.id === style.id;
    })
  }

  restoreSearch(){
    let preselected = this.$location.search()['drawer-style'];
    if (preselected){
      this.toggleExpanded({id:preselected})
    }
  }

  getWebSettings(){
    Preoday.VenueWebSettings.get(this.$stateParams.venueId)
      .then((webSettings)=>{
        this.$timeout(()=>{
          this.model = webSettings;
          this._restoreImages();
          this.Spinner.hide('style-drawer');
          console.log("this model", this.model)
        })
      },()=>{ //api returns 404 if not found
        this.model = {
          $logoImages:[]
        }
        this.Spinner.hide('style-drawer');
      }).catch((err)=>{
        console.log("err", err)
      })
  }



  constructor($q, $scope, $mdSidenav, Spinner, $stateParams, contextualDrawer, $location, $timeout, gettextCatalog, $rootScope) {
    "ngInject";
    this.$q = $q;
    this.contextualDrawer = contextualDrawer;
    Spinner.show('style-drawer');
    this.$stateParams = $stateParams;

    this.getWebSettings();
    this.$mdSidenav = $mdSidenav;
    this.$scope = $scope;
    this.$location = $location;
    this.$timeout = $timeout;
    this.Spinner = Spinner;

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
