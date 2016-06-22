export default class UtilsService {

	static get UID(){
    return "UtilsService"
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

  getCookie (name) {

    var match = document.cookie.match(new RegExp(name + '=([^;]+)'));
    if (match) return match[1];
    return false;
  }


  constructor() {
    "ngInject";

  }
}
