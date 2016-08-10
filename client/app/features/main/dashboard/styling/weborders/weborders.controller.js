
export default class webordersController {
  static get UID(){
    return "webordersController";
  }

  increaseZoom(){

  }

  decreaseZoom(){

  }

  openDrawer(el){
    console.log("opening drawer",el);
    this.contextual.showDrawer('style');
  }

  receiveMessage(event){
      var origin = event.origin || event.originalEvent.origin; // For Chrome, the origin property is in the event.originalEvent object.
      if (origin !== "http://localhost:3000"){
        return;
      }
      console.log("got event", event);
      switch(event.data) {
        case "LOADED":
          this.Spinner.hide('iframe');
          break;
        default:
          this.openDrawer(event.data);
          break;
      }

  }


  constructor(Spinner, contextual) {
    "ngInject";

    if (!window.hasListener){
      window.addEventListener("message", this.receiveMessage.bind(this), false);
      window.hasListener = true;
    }


    Spinner.show('iframe');
    this.Spinner = Spinner;
    this.contextual = contextual;
    this.zoomLevel = 1;
  }
}
