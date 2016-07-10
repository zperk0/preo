export default class cardItemListController {
  static get UID(){
    return "cardItemListController"
  }

  onClone(){
    console.log("cloning item");
  }

  onEdit(){
    console.log("edit item");
  }

  onDelete(){
   console.log("delete item");
  }

  clickNew(){
    console.log("clicked new");
    if (this.onClickNew){
      this.onClickNew();
    }
  }

  constructor() {
    "ngInject";
  }
}
