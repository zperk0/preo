export default class SpinnerService {
  static get UID(){
    return "Spinner"
  }

  updateIsVisible(){
    this.isVisible = this.visibleCodes.length > 0;
    this.DEBUG && console.log("updated visible", this.isVisible);
  }


  show(code){
    this.visibleCodes.push(code);
    this.updateIsVisible();
  }

  hide(code){
    console.log("hiding code")
    let index = this.visibleCodes.indexOf(code);
    if (index > -1) {
      this.DEBUG && console.log("got index");
      this.visibleCodes.splice(index, 1);
      this.updateIsVisible();
    }
  }

  constructor() {
    'ngInject';
    this.DEBUG = true;
    this.isVisible=false;
    this.visibleCodes=[];

  }
}
