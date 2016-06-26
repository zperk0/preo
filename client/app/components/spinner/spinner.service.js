export default class SpinnerService {
  static get UID(){
    return "Spinner"
  }

  updateIsVisible(){
    this.$timeout(()=>{
      this.isVisible = this.visibleCodes.length > 0;
      this.DEBUG && console.log("updated visible", this.isVisible);
    })
  }


  show(code){
    this.DEBUG && console.log("showing spinner", code)
    this.visibleCodes.push(code);
    this.updateIsVisible();
  }

  empty(){
    this.visibleCodes = [];
    this.updateIsVisible();
  }

  hide(code){
    this.DEBUG && console.log("hiding spinner", code)
    let index = this.visibleCodes.indexOf(code);
    if (index > -1) {
      this.visibleCodes.splice(index, 1);
      this.updateIsVisible();
    }
  }

  constructor($timeout) {
    'ngInject';
    this.DEBUG = true;
    this.isVisible=false;
    this.visibleCodes=[];
    this.$timeout = $timeout;

  }
}