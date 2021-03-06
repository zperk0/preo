export default class cardItemListController {
  static get UID(){
    return "cardItemListController"
  }

  onItemCreated(newItem, isLast){
    this.addItemInPosition(newItem, isLast);
    this.deleteItem({});
  }

  onItemUpdated(){
    this.selectItem();
    this.deleteItem({});
  }

  addItemInPosition(item, isLast=false){
    if (this.collection.filter((i)=>i.id===item.id).length)
      return;
    let indexBefore = this.collection.length-1; //force add to last wiht splice(-1,...);
    if (!isLast){
      indexBefore = -1;
      this.collection.forEach((i, index)=>{
        if (i.position <= item.position){
          indexBefore = index;
        }
      })
    }
    this.collection.splice(indexBefore+1, 0, item);
  }

  // add a cloned item in the correct position after the original item
  insert (currentItem, newItem, section) {
    newItem.sectionId = section.id;
    newItem.menuId = section.menuId;
    this.collection.splice(this.collection.indexOf(currentItem) + 1, 0, newItem);
  }

  onUpdateItem(oldItem, newItem) {

    newItem.$show = true;  //need show for animation
    newItem.$selected = false;  //need show for animation

    this.collection.splice(this.collection.indexOf(oldItem), 1, newItem);
  }

  onItemDeleted(item){
    this.deleteItem(item)
  }

  isItemDuplicated(items, qty){
   for (let j=0;j<items.length;j++){
     let found = 0;
      for (let i=0;i<this.collection.length;i++){
        if (this.collection[i].id === items[j].id){
          found++;
          // sort list adds the item in the new list, if we find it we must remove it
          if (found>qty){
            return true;
          }
        }
      }
    }
  }

  expandItem(item){
    this.collection.forEach((s)=>{
      if (s.id === item.id){
        s.$expanded = !s.$expanded;
      } else {
        s.$expanded = false;
      }
    });
  }

  onSimpleSort(data){
    const promises = [];
    this.collection.forEach((s, index)=>{
      let clone = angular.copy(s);
      clone.position=index*1000;
      promises.push(clone.update(data));
    });
    return this.$q.all(promises)
  }

  deleteItem(item){
    if (this.collection){
      this.collection = this.collection.filter((s)=>item.id !== s.id);
    }
    //FIXME have to to this twice because of the searchable lists
    if (this.collectionResults){
      this.collectionResults = this.collectionResults.filter((s)=>item.id !== s.id);
    }
  }

  selectItem(item){
    if (this.collection) {
      this.collection.forEach((i)=>{
        if (item && i.id===item.id){
          i.$selected = true;
        } else {
          i.$selected = false
        }
      });
    }
  }

  clickNew(){
    console.log("clicked new");
    if (this.onClickNew){
      this.onClickNew();
    }
  }

  constructor($scope, $timeout, $q) {
    "ngInject";
    this.$scope = $scope;
    this.$timeout = $timeout;
    this.$q = $q;
  }
}
