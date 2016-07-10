export default class cardItemListController {
  static get UID(){
    return "cardItemListController"
  }

  selectItem(item){
    this.collection.forEach((i)=>{
      if (item && i.id===item.id){
        item.$selected = true;
      } else {
        item.$selected = false
      }
    })
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
