export default class modifierItemsController {
  static get UID(){
    return "modifierItemsController"
  }

  deleteItem(item){
    this.modifier.$deletedItems = this.modifier.$deletedItems.concat(this.modifier.items.filter((o)=> o == item));
    this.modifier.items = this.modifier.items.filter((o)=>o != item);
  }

  addOption(){
    this.modifier.items.push(this.getEmptySize());
  }

  getEmptySize(){
    let opt = {
      visible:1,
      price:0
    }
    opt.position = this.modifier.items.length * 1000;
    return opt;
  }

  constructor() {
    "ngInject";
    this.modifier.$deletedItems =[];

  }
}
