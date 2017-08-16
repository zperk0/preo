export default class contextualDrawerStyleMobileController {
  static get UID(){
    return "ContextualDrawerStyleMobile";
  }

  _restoreImages(){
    this.StyleService.imagesModel.$images = {
      mobileBackground: this.StyleService.imagesModel[this.drawerKey] ? [{ //we neeed to to this because of the name of the property in image_uploader, it's image not src
          id:this.StyleService.imagesModel[this.drawerKey].id, //this could be avoided if we rename venues column from src to image
          image:this.StyleService.imagesModel[this.drawerKey].src,
          type: this.drawerKey,
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
             angular.extend(this.StyleService.imagesModel[img.type], {src:itemImage.image});
         })
         promises.push(p);
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
      image.type = this.drawerKey;
    }
  }

  onImageDelete(key, image){
    if (key && image){ //only one key here
      this.DialogService.delete(this.LabelService.TITLE_DELETE_ITEM_IMAGE, this.LabelService.CONTENT_DELETE_ITEM_IMAGE)
      .then(()=> {
        this.Spinner.show("venue-image-delete");
        let img = this.StyleService.imagesModel[image.type];
        img.delete().then(()=>{
          this.StyleService.imagesModel[image.type] = new Preoday.VenueImage({type:image.type});
          this.StyleService.imagesModel.$images[key]= [];
          this.originalModel.images[image.type] = new Preoday.VenueImage({type:image.type});
          this.originalModel.images.$images[key]= [];
          this.Snack.show(this.LabelService.IMAGE_DELETE_SUCCESS);
          this.Spinner.hide("venue-image-delete");
     })
        .catch((err)=>{
          console.log("Failed deleting item image", err)
          this.Spinner.hide("venue-image-delete")
          this.Snack.showError(this.LabelService.IMAGE_DELETE_ERROR);
        })
      });
    }
  }

  saveVenueImages() {
    return this.$q((resolve,reject)=>{
      this._saveImagesToCdn()
      .then(()=>{
        var promises = [];
        angular.forEach(this.StyleService.imagesModel,(img,key)=>{
          if(key != "$images" && img.src && img.type){
            if(img.id){
              promises.push(img.update());
            } else {
              img.venueId=this.$stateParams.venueId;
              promises.push(Preoday.VenueImage.create(img).then((newImg)=>{
                angular.extend(this.StyleService.imagesModel[img.type], newImg);
              }))
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

  saveSettings() {
    return this.$q((resolve, reject) => {
      let obj = {
        wallpaper: this.model.images[this.drawerKey].src,
        buttonColour: this.model.colors.buttonColour.substr(1) // jump first # character
      };
      angular.extend(this.VenueService.currentVenue.settings, obj);

      this.VenueService.currentVenue.settings.update()
      .then(resolve, reject)
      .catch((err)=>{
        console.error('Error saving Venue Settings - ', err);
        reject(err);
      });
    });
  }

  saveAll() {
    return this.saveVenueImages()
      .then(this.saveSettings.bind(this));
  }

  saveAndClose(){
    this.showSavingSpinner();
    return this.saveAll().then(()=>{
      this.hideSavingSpinner();
      this.Snack.show(this.LabelService.SNACK_MOBILE_STYLING_SUCCESS)
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
    gettextCatalog, $rootScope, LabelService, UtilsService, DialogService, StyleService, VenueService) {
    "ngInject";
    this.$q = $q;
    this.StyleService = StyleService;
    this.LabelService = LabelService;
    this.UtilsService = UtilsService;
    this.DialogService = DialogService;
    this.contextualDrawer = contextualDrawer;
    this.gettextCatalog = gettextCatalog;
    this.VenueService = VenueService;
    this.$stateParams = $stateParams;
    this.$location = $location;
    this.$timeout = $timeout;
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.$scope = $scope;
    this.$rootScope = $rootScope;

    this.drawerKey = 'MOB_BACKGROUND';

    this.styles = [{
      id: this.drawerKey,
      name: this.gettextCatalog.getString("Splash screen background"),
      height: '360px'
    },
    {
      id: "MOB_BUTTONS",
      name: this.gettextCatalog.getString("Button colour"),
      height: '100px'
    }];

    this.model = {
      images: [],
      colors: {}
    };

    this.init();
  }

  init() { 
    this.showSpinner();
    this.StyleService.getMobileImages(this.drawerKey)
    .then(()=>{

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
