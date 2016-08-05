export default class itemChipController {
  static get UID(){
    return "itemChipController"
  }

  remove(){

    this.onRemove && this.onRemove({
      item: this.item
    });
  }

  constructor() {
    "ngInject";
  }
}
