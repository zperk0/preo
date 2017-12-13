export default class UtilsService {

	static get UID(){
    return "UtilsService"
  }

  getBase64Image(url) {
    url = this.getImagePath(url);
    return this.$q((resolve, reject)=>{
      var img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');
      img.onload = function () {
        try{
          console.log("on loaded");
          var canvas = document.createElement("canvas");
          canvas.width =this.width;
          canvas.height =this.height;

          var ctx = canvas.getContext("2d");
          ctx.drawImage(this, 0, 0);

          var dataURL = canvas.toDataURL("image/png");
          console.log("resolving");
          resolve(dataURL)
        } catch(e){
          console.log("on catch", e);
          reject(e)
        }
      };

      img.onerror = function(){
        reject("Error loading image url");
      }

      img.src = url;
    })
  }

  getDomain() {
    return "preoday";
  }

  getImagePath (imgUrl) {
    if(!imgUrl)
      return;
    var outputUrl = window._PREO_DATA._CDNROOT;

    if (/^https?:\/\//.test(imgUrl)){
      return imgUrl;
    }

    if (imgUrl[0]==="/" && outputUrl[outputUrl.length-1]==="/"){
      imgUrl = imgUrl.substring(1);
    }

    return outputUrl+imgUrl;

  }

  str_repeat (input, multiplier) {

    var y = '';
    while (true) {
        if (multiplier & 1) {
            y += input;
        }
        multiplier >>= 1;
        if (multiplier) {
            input += input;
        }
        else {
            break;
        }
    }
    return y;
  }

  getLanguages () {

    return [{
      name: this.gettextCatalog.getString('Dannish'),
      value: 'da-DA'
    },{
      name: this.gettextCatalog.getString('Dutch'),
      value: 'nl-NL'
    },{
      name: this.gettextCatalog.getString('English'),
      value: 'en-GB'
    },{
      name: this.gettextCatalog.getString('French'),
      value: 'fr-FR'
    },{
      name: this.gettextCatalog.getString('Finnish'),
      value: 'fi-FI'
    },{
      name: this.gettextCatalog.getString('German'),
      value: 'de-DE'
    },{
      name: this.gettextCatalog.getString('Norwegian'),
      value: 'nb-NO'
    },{
      name: this.gettextCatalog.getString('Spanish'),
      value: 'es-ES'
    },{
      name: this.gettextCatalog.getString('Swedish'),
      value: 'sv-SE'
    },{
      name: this.gettextCatalog.getString('Portuguese'),
      value: 'pt-BR'
    }];
  }

  getRoleAsString(role) {
    return {
      ADMIN: this.gettextCatalog.getString("Administrator"),
      MANAGER: this.gettextCatalog.getString("Manager"),
      STAFF: this.gettextCatalog.getString("Staff Member"),
      OPERATOR: this.gettextCatalog.getString("Operator")
    }[role] || role;
  }

  setLocale (locale) {

    if(locale) {
      let language = locale.substr(0, locale.indexOf('-')).toLowerCase(),
          country = locale.substr(locale.indexOf('-')+1,locale.length-1).toLowerCase();
      switch(language) {
        case 'no':
          language = 'nb';
          break;
      }
      this.gettextCatalog.setCurrentLanguage(language);
      console.log("set moment locale", language+"-"+country);
      moment.locale(language+"-"+country);
    } else {
      moment.locale('en-gb');
    }
    this.ErrorService.setStrings();
    this.translateStrings();
  }

  translateStrings() {
    this.$mdpTimePicker.setOKButtonLabel(this.gettextCatalog.getString('OK'));
    this.$mdpTimePicker.setCancelButtonLabel(this.gettextCatalog.getString('Cancel'));

    this.$mdpDatePicker.setOKButtonLabel(this.gettextCatalog.getString('OK'));
    this.$mdpDatePicker.setCancelButtonLabel(this.gettextCatalog.getString('Cancel'));
  }

  updateLocale (locale) {

    let UserService = this.$injector.get('UserService');
    let StateService = this.$injector.get('StateService');

    if (UserService.isLogged() && UserService.getCurrent().locale) {
      return this.setLocale(UserService.getCurrent().locale);
    }

    if (StateService.venue) {
      return this.setLocale(StateService.venue.locale);
    }

    return this.setLocale();
  }

  onMessage (callback) {
    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";

    var eventer = window[eventMethod];
    var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

    eventer(messageEvent,function(e) {

      callback && callback(e);

    },false);
  }

  getHost() { return window.location.protocol + "//" + window.location.host; }


  constructor($q, gettextCatalog, $injector, ErrorService, $mdpTimePicker, $mdpDatePicker) {
    "ngInject";

    this.$q = $q;
    this.gettextCatalog = gettextCatalog;
    this.$injector = $injector;
    this.ErrorService = ErrorService;
    this.$mdpTimePicker = $mdpTimePicker;
    this.$mdpDatePicker = $mdpDatePicker;
  }
}
