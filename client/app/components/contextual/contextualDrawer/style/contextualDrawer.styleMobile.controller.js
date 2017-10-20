export default class contextualDrawerStyleMobileController {
  static get UID(){
    return "ContextualDrawerStyleMobile";
  }

  _restoreImages(){
    this.StyleService.imagesModel.$images = {
      mobileWallpaper: this.StyleService.imagesModel[this.drawerKey] ? [{ //we neeed to to this because of the name of the property in image_uploader, it's image not src
          id:this.StyleService.imagesModel[this.drawerKey].id, //this could be avoided if we rename venues column from src to image
          image:this.StyleService.imagesModel[this.drawerKey].src,
          type: null,
          $image:this.UtilsService.getImagePath(this.StyleService.imagesModel[this.drawerKey].src)
      }] : []
    }
  }

  _saveImagesToCdn() {
    var promises = []
    angular.forEach(this.StyleService.imagesModel.$images,(imageObject, key)=>{
      let img = imageObject[0];
      if (img){
        if (img.$save) {
          let p = Preoday.VenueImage.saveToCdn(img.$image, this.$stateParams.venueId)
          .then((itemImage) => {

            if (this.StyleService.imagesModel[key]) {
              angular.extend(this.StyleService.imagesModel[key], {src:itemImage.image});
            } else {
              this.StyleService.imagesModel[key] = {src:itemImage.image};
            }

            this.imageSaved = true;
          });
          promises.push(p);
        }
      }
    });

    if (promises.length === 0){
      console.log("Item does not have images")
    }

    return this.$q.all(promises);
  }

  onImageUpload(key, image){
    console.log('image uploaded');
  }

  onImageDelete(key, image){
    if (key && image){ //only one key here
      this.DialogService.delete(this.LabelService.TITLE_DELETE_ITEM_IMAGE, this.LabelService.CONTENT_DELETE_ITEM_IMAGE)
      .then(()=> {
        this.Spinner.show("venue-image-delete");
        let img = this.StyleService.imagesModel[key];

        this.model.mobileSettings.wallpaper = null;
        this.model.mobileSettings.update()
        .then(() => {
          img.delete().then(()=>{
            this.StyleService.imagesModel[key] = new Preoday.VenueImage();
            this.StyleService.imagesModel.$images[key]= [];
            this.originalModel.images[key] = new Preoday.VenueImage();
            this.originalModel.images.$images[key]= [];
            this.Snack.show(this.LabelService.IMAGE_DELETE_SUCCESS);
            this.Spinner.hide("venue-image-delete");
          })
        })
        .catch((err)=>{
          console.log("Failed deleting item image", err)
          this.Spinner.hide("venue-image-delete")
          this.Snack.showError(this.LabelService.IMAGE_DELETE_ERROR);
        });
      });
    }
  }

  saveVenueImages() {

    return this.$q((resolve,reject)=>{
      this._saveImagesToCdn()
      .then(()=>{
        var promises = [];
        angular.forEach(this.StyleService.imagesModel.$images,(img,key)=>{
          let image = img[0];
          if(image && image.$save){
              let venueImage = this.StyleService.imagesModel[key];

              if(venueImage.src){
                if(venueImage.id){
                  promises.push(venueImage.update());
                } else {
                  venueImage.venueId = this.$stateParams.venueId;
                  promises.push(
                    Preoday.VenueImage.create(venueImage)
                    .then((newImg)=>{
                      angular.extend(this.StyleService.imagesModel[key], newImg);
                    })
                  );
                }
              }
          }
        });

        this.$q.all(promises).then(resolve, reject);
      }).catch((err)=>{
        console.error('Error saving Venue IMages - ', err);
        reject(err);
      })
    });
  }

  _shouldSaveSettings() {

    let hasChanges = false;
    if(!this.model.mobileSettings.buttonColour && this.model.colors.buttonColour ||
       this.model.mobileSettings.buttonColour && !this.model.colors.buttonColour ||
       this.model.mobileSettings.buttonColour != this.model.colors.buttonColour )
      return true;

    if(!this.model.mobileSettings.buttonTextColour && this.model.colors.buttonTextColour ||
       this.model.mobileSettings.buttonTextColour && !this.model.colors.buttonTextColour ||
       this.model.mobileSettings.buttonTextColour != this.model.colors.buttonTextColour )
      return true;

    if(!this.model.mobileSettings.wallpaper && this.model.images[this.drawerKey].id ||
      this.model.mobileSettings.wallpaper && !this.model.images[this.drawerKey].id ||
      this.model.images[this.drawerKey].id != this.model.mobileSettings.wallpaper)
      return true;

    if(this.StyleService.imagesModel.$images) {
      angular.forEach(this.StyleService.imagesModel.$images, (value, key) => {
        let image = value[0];
        if(image && image.$save)
          hasChanges = true;
      });
    }

    return hasChanges;
  }

  saveSettings() {
    return this.$q((resolve, reject) => {

      if(!this._shouldSaveSettings()) {
        return resolve({hideSave: true});
      }

      let obj = {
        wallpaper: this.model.images[this.drawerKey] ? this.model.images[this.drawerKey].id : '',
        buttonColour: this.model.colors.buttonColour ? this.model.colors.buttonColour.substr(1) : '', // jump first # character
        buttonTextColour: this.model.colors.buttonTextColour ? this.model.colors.buttonTextColour.substr(1) : ''  // jump first # character
      };
      angular.merge(this.model.mobileSettings, obj);

      if (this.model.mobileSettings.id) {
        this.model.mobileSettings.update()
        .then(resolve, reject)
        .catch((err)=>{
          console.error('Error updating Venue Mobile Settings - ', err);
          reject(err);
        });
      } else {
        Preoday.VenueMobileSettings.save(this.model.mobileSettings, this.StateService.venue.id)
        .then((newSettings) => {
          angular.extend(this.model.mobileSettings, newSettings);
          this.StyleService.mobileExtendModels(newSettings);
          resolve(newSettings);
        })
        .catch((err)=>{
          console.error('Error saving Venue Mobile Settings - ', err);
          reject(err);
        });
      }

    });
  }

  saveAll() {
    return this.saveVenueImages()
      .then(this.saveSettings.bind(this))
  }

  saveAndClose(){
    this.showSavingSpinner();
    return this.saveAll().then((data)=>{
      this.hideSavingSpinner();

      if(!data.hideSave || this.imageSaved) {
        this.Snack.show(this.LabelService.SNACK_MOBILE_STYLING_SUCCESS)
      }

      this.imageSaved = false;
      this.originalModel = angular.copy(this.model);
      return this.close();
    }, ()=>{
      this.hideSavingSpinner();
      this.Snack.showError(this.LabelService.SNACK_MOBILE_STYLING_ERROR)
    }).catch(()=> {
      this.hideSavingSpinner();
      this.Snack.showError(this.LabelService.SNACK_MOBILE_STYLING_ERROR)
    });
  }

  close(){
    this.$timeout(this.toggleExpanded.bind(this));
    this.StyleService.imagesModel = angular.copy(this.originalModel.images);
    this.StyleService.templatesModel = angular.copy(this.originalModel.templates);
    this._restoreImages();
    return this.contextualDrawer.close();
  }

  toggleExpanded(style){
    if (!style){
      this.styles.forEach((i)=>{ //collapse all
        i.expanded = false;
      })
      return;
    }
    let match =  this.styles.filter((i)=> i.id === style.id)[0];
    if (match && !match.expanded){
        this.styles.forEach((i)=>{ //collapse all
          i.expanded = i.id === style.id;
        })
    }
  }

  restoreSearch(){
    let preselected = this.$location.search()['drawer-mobile-style'];
    console.log("restoring search - drawer-mobile-style - ", preselected, this.styles)
    if (preselected){
      this.toggleExpanded({id:preselected})
    }
  }

  showSavingSpinner() {
    this.Spinner.show('style-mobile-saving');
  }

  hideSavingSpinner() {
    this.Spinner.hide('style-mobile-saving');
  }

  showSpinner() {
    this.Spinner.show('style-drawer-mobile');
  }

  hideSpinner() {
    this.Spinner.hide('style-drawer-mobile');
  }

  constructor($q, $scope, Spinner, Snack, $stateParams, contextualDrawer, $location, $timeout,
    gettextCatalog, $rootScope, LabelService, UtilsService, DialogService, StyleService, StateService) {
    "ngInject";
    this.$q = $q;
    this.StyleService = StyleService;
    this.LabelService = LabelService;
    this.UtilsService = UtilsService;
    this.DialogService = DialogService;
    this.contextualDrawer = contextualDrawer;
    this.gettextCatalog = gettextCatalog;
    this.StateService = StateService;
    this.$stateParams = $stateParams;
    this.$location = $location;
    this.$timeout = $timeout;
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.$scope = $scope;
    this.$rootScope = $rootScope;

    this.drawerKey = 'mobileWallpaper';

    this.styles = [{
      id: this.drawerKey,
      name: this.gettextCatalog.getString("Splash screen background"),
      height: '360px'
    },
    {
      id: "mobileButtons",
      name: this.gettextCatalog.getString("Button colour"),
      height: '150px'
    }];

    this.model = {
      images: [],
      colors: {}
    };

    this.init();
  }

  init() {
    this.showSpinner();
    this.StyleService.getMobileSettings()
    .then((data)=>{
      this.model.mobileSettings = data ? data : new Preoday.VenueMobileSettings();
      this.model.images = this.StyleService.imagesModel;
      this.model.colors = this.StyleService.colorsModel;

      this.$scope.$watch('drawerStyleMobileCtrl.StyleService.imagesModel',(nv)=>{
        this.model.images = nv;
      })

      this._restoreImages();
      this.originalModel  = angular.copy(this.model);
      this.hideSpinner();
    }, ()=>{
      this._restoreImages();
      this.hideSpinner();
    }).catch((err)=>{
      console.log("Error fetching Styles -", err)
      this.hideSpinner();
    })

    this.$rootScope.$on('$locationChangeSuccess', (event)=>{
      this.restoreSearch();
    })

    this.restoreSearch();
  }
}
