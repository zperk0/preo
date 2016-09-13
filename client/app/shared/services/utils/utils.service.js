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
    var outputUrl = window._PREO_DATA._CDNROOT;

    if (/^https?:\/\//.test(imgUrl)){
      return imgUrl;
    }

    if (imgUrl[0]==="/" && outputUrl[outputUrl.length-1]==="/"){
      imgUrl = imgUrl.substring(1);
    }

    return outputUrl+imgUrl;

  }


  constructor($q) {
    "ngInject";
    this.$q = $q;

  }
}
