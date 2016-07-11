export default class cardItemListController {
  static get UID(){
    return "cardItemListController"
  }

  onItemMoved($items, $partFrom, $partTo, $indexFrom, $indexTo){
    console.log("modifier moveds", $items);
  }


  clearPossibleNewItem(){
    console.log("clearing possible");
    if (this.collection){
      this.collection = this.collection.filter((s)=>s.id !== undefined)
    }
  }


  selectItem(item){
    this.clearPossibleNewItem();
    this.collection.forEach((i)=>{
      if (item && i.id===item.id){
        i.$selected = true;
      } else {
        i.$selected = false
      }
    })
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
