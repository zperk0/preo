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
      value: 'da_DA'
    },{
      name: this.gettextCatalog.getString('Dutch'),
      value: 'nl_NL'
    },{
      name: this.gettextCatalog.getString('English'),
      value: 'en_US'
    },{
      name: this.gettextCatalog.getString('French'),
      value: 'fr_FR'
    },{
      name: this.gettextCatalog.getString('Finnish'),
      value: 'fi_FI'
    },{
      name: this.gettextCatalog.getString('German'),
      value: 'de_DE'
    },{
      name: this.gettextCatalog.getString('Norwegian'),
      value: 'nb_NO'
    },{
      name: this.gettextCatalog.getString('Spanish'),
      value: 'es_ES'
    },{
      name: this.gettextCatalog.getString('Swedish'),
      value: 'sv_SE'
    }];
  }

  constructor($q, gettextCatalog) {
    "ngInject";

    this.$q = $q;
    this.gettextCatalog = gettextCatalog;

  }
}
