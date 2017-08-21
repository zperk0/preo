'use strict';

export default class StyleService {

  static get UID(){
    return "StyleService";
  }

 getWebSettings(){
    return this.$q((resolve, reject)=>{
      Preoday.VenueWebSettings.get(this.VenueService.currentVenue.id)
      .then((webSettings)=>{
        resolve(webSettings);
      },()=>{ //api returns 404 if not found
        resolve({})
      })
    });
  }

  getTemplates(){
    console.log("getting templates");
    return this.$q((resolve, reject)=>{
      Preoday.TemplateFragment.get(this.VenueService.currentVenue.id)
        .then((templates)=>{
          if (templates && templates.length){
            let ts = templates.filter((t)=>t.type ==='ORDER_PLACED_EMAIL_FOOTER');
            if (ts && ts.length){
              this.templatesModel[ts[0].type] = ts[0];
            }
          }
          console.log("resolving templates", this.templatesModel);
          resolve(this.templatesModel)
        },()=>{ //api returns 404 if not found
          resolve(this.templatesModel)
        }).catch((err)=>{
          console.log("catch err", err)
          resolve(this.templatesModel)
      })
    });
  }

  getMobileImages(type) {
    return this.$q((resolve, reject)=>{
      return Preoday.VenueImage.get(this.VenueService.currentVenue.id)
        .then((images)=>{
          if (images && images.length){
            let ts = images.filter((t)=>t.type === type);
            if (ts && ts.length){
              this.imagesModel[ts[0].type] = ts[0];
            }
          }
          resolve(this.imagesModel)
        },(err)=>{ //api returns 404 if not found
          resolve(this.imagesModel)
        }).catch((err)=>{
          resolve(this.imagesModel)
      })
    });
  }

  mobileExtendModels(data) {
    angular.forEach(data, (value, key) => {

      if(key.indexOf('Image') >= 0){ 
        let newKey = key.substr(0, key.indexOf('Image'));

        if(value)
          this.imagesModel[newKey] = new Preoday.VenueImage(value);
        else
          this.imagesModel[newKey] = new Preoday.VenueImage();
      }

      // add # character, so md-color-picker can recognize as a color.
      if(key.indexOf('Colour') >= 0 && value){
        this.colorsModel[key] = '#' + value;
      }
    });
  }

  getMobileSettings() {
    return this.$q((resolve, reject)=>{
      return Preoday.VenueMobileSettings.get(this.VenueService.currentVenue.id, "images")
        .then((data)=>{
          if(data) {
            this.mobileExtendModels(data);
          }

          resolve(data);
        },(err)=>{ //api returns 404 if not found
          resolve(this.imagesModel)
        }).catch((err)=>{
          resolve(this.imagesModel)
      })
    });
  }

  getImages(){
    console.log("getting images");
    return this.$q((resolve, reject)=>{
      return Preoday.VenueImage.get(this.VenueService.currentVenue.id)
        .then((images)=>{
          if (images && images.length){
            let ts = images.filter((t)=>t.type ==='EMAIL_BANNER');
            if (ts && ts.length){
              this.imagesModel[ts[0].type] = ts[0];
            }
          }
          resolve(this.imagesModel)
        },(err)=>{ //api returns 404 if not found
          resolve(this.imagesModel)
        }).catch((err)=>{
          resolve(this.imagesModel)
      })
    });
  }

  initTemplates(){
    var venue = this.VenueService.currentVenue.name;
    var contact = this.VenueService.currentVenue.settings.deliveryPhone;
    var msg = this.gettextCatalog.getString("If there are any problems, please contact {{venue}}'s staff",{venue:venue});
    if (contact){
      msg = this.gettextCatalog.getString("If there are any problems, please contact {{venue}} on {{contact}}",{venue:venue, contact:contact})
    }
    this.templatesModel = new Preoday.TemplateFragment({
      ORDER_PLACED_EMAIL_FOOTER:{
        content: msg,
        type:'ORDER_PLACED_EMAIL_FOOTER'
      }
    });
  }

  constructor($q, VenueService, Spinner, Snack, LabelService, gettextCatalog) {
    "ngInject";
    this.$q = $q;
    this.VenueService = VenueService;
    this.LabelService = LabelService;
    this.gettextCatalog = gettextCatalog;

    this.initTemplates();
    this.imagesModel = {
      EMAIL_BANNER: new Preoday.VenueImage({
        type:"EMAIL_BANNER"
      }),
    };

    this.colorsModel = {};
  }
}
