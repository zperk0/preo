export default class contextualDrawerStyleController {
  static get UID(){
    return "ContextualDrawerStyleEmails";
  }

  _restoreImages(){
    this.StyleService.imagesModel.$images = {
      emailBanner: this.StyleService.imagesModel['EMAIL_BANNER'] ? [{ //we neeed to to this because of the name of the property in image_uploader, it's image not src
          id:this.StyleService.imagesModel['EMAIL_BANNER'].id, //this could be avoided if we rename venues column from src to image
          image:this.StyleService.imagesModel['EMAIL_BANNER'].src,
          type:'EMAIL_BANNER',
          $image:this.UtilsService.getImagePath(this.StyleService.imagesModel['EMAIL_BANNER'].src)
      }] : []
    }
  }



  _saveImages(imgs) {
    var promises = []
    angular.forEach(imgs,(imageObject, key)=>{
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

  onImageDelete(key, image){
    if (key && image){ //only one key here
      this.DialogService.delete(this.LabelService.TITLE_DELETE_ITEM_IMAGE, this.LabelService.CONTENT_DELETE_ITEM_IMAGE)
      .then(()=> {
        this.Spinner.show("venue-image-delete");
        let img = this.StyleService.imagesModel[image.type];
        img.delete().then(()=>{
          this.StyleService.imagesModel[image.type] = {};
          this.StyleService.imagesModel.$images[key]= [];
          this.Snack.show('Image deleted');
          this.Spinner.hide("venue-image-delete");
        })
        .catch((err)=>{
          console.log("Failed deleting item image", err)
          this.Spinner.hide("venue-image-delete")
          this.Snack.showError('Image not deleted');
        })
      });
    }
  }


  saveEmails(){
    return this.saveTemplates()
      .then(this.saveVenueImages.bind(this))
  }

  saveTemplates(){
    return this.$q((resolve, reject)=>{
      var promises = [];
      debugger;
      angular.forEach(this.model.templates,(t)=>{
        if (t.id){
          promises.push(t.update());
        } else{
          t.venueId=this.$stateParams.venueId;
          t.active = 1;
          promises.push(Preoday.TemplateFragment.create(t));
        }
      })
      this.$q.all(promises).then(function(){
        resolve();
      },()=>{
        reject();
      }).catch((err)=>{
        console.error(err);
        reject();
      })
    })
  }

  saveVenueImages(){
    return this._saveImages()
  }


  saveAndClose(){
    this.Spinner.show('style-saving');
    return this.saveEmails().then(()=>{
      this.Spinner.hide('style-saving');
      this.Snack.show(this.LabelService.SNACK_WEBSETTINGS_SUCCESS)
      this.originalModel = angular.copy(this.model);
      return this.close();
    }, ()=>{
      this.Spinner.hide('style-saving');
      this.Snack.showError(this.LabelService.SNACK_WEBSETTINGS_ERROR)
    }).catch(()=> {
      this.Spinner.hide('style-saving');
      this.Snack.showError(this.LabelService.SNACK_WEBSETTINGS_ERROR)
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
    let preselected = this.$location.search()['drawer-emails-style'];
    console.log("restoring search - drawer-emails-style - ", preselected, this.styles)
    if (preselected){
      this.toggleExpanded({id:preselected})
    }
  }


  constructor($q, $scope, $mdSidenav, Spinner, Snack, $stateParams, contextualDrawer, $location, $timeout, gettextCatalog, $rootScope, LabelService, UtilsService, DialogService, StyleService) {
    "ngInject";
    this.$q = $q;
    this.StyleService = StyleService;
    this.LabelService = LabelService;
    this.UtilsService = UtilsService;
    this.DialogService = DialogService;
    this.contextualDrawer = contextualDrawer;
    this.gettextCatalog = gettextCatalog;

      this.styles = [
        {
          id:"BANNER",
          name:this.gettextCatalog.getString("Header"),
          height:'219px'
        },
        {
          id:"FOOTER",
          name:this.gettextCatalog.getString("Footer"),
          height:'500px'
        }
      ]

    Spinner.show('style-drawer-emails');
    this.$stateParams = $stateParams;

    StyleService.getTemplates()
    .then(StyleService.getImages.bind(StyleService))
    .then(()=>{
      this.model = {
        images: StyleService.imagesModel,
        templates: StyleService.templatesModel,
      }
      $scope.$watch('drawerStyleEmailsCtrl.StyleService.imagesModel',(nv)=>{
        this.model.images = nv;
      })
      $scope.$watch('drawerStyleEmailsCtrl.StyleService.templatesModel',(nv)=>{
        this.model.templates = nv;
      })
      this.originalModel  = angular.copy(this.model);
      this._restoreImages();
      Spinner.hide('style-drawer-emails');
    }, ()=>{
      this._restoreImages()
    }).catch((err)=>{
      console.log("err", err)
      Spinner.hide('style-drawer-emails');
    })
    this.$mdSidenav = $mdSidenav;
    this.$scope = $scope;
    this.$location = $location;
    this.$timeout = $timeout;
    this.Spinner = Spinner;
    this.Snack = Snack;
    $rootScope.$on('$locationChangeSuccess', (event)=>{
      this.restoreSearch();
    })

    this.restoreSearch();

  }
}
