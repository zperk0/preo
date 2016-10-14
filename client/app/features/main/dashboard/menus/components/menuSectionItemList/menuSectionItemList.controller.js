export default class menuSectionItemListController {

  static get UID(){
    return "menuSectionItemListController"
  }

  onItemCreated(newItem) {

    this.recalculateHeight();

    this.ItemService.addItem(newItem);
  }

  onItemUpdated() {

    this.recalculateHeight();
  }

  onItemDeleted(item) {

    this.cardItemList.deleteItem(item);
  }

  showCreateItem($event, isImport){

    let newItem = this.ItemService.getNewItemBase(this.$stateParams.venueId);

    if(!isImport){
      let isCreating = this.items.filter((s, index) => {

        return !s.id;
      }).length > 0;

      if (isCreating){
        return;
      }

      if (this.items && this.items.length && this.section.id){
        newItem.sectionId = this.section.id;
        newItem.position = Math.max.apply(Math,this.items.map(function(o){return o.position;})) + 1000;
      }
      this.items.push(newItem);
    } else {
      this.contextual.showDrawer('items');
    }

    $event.stopPropagation();
  }

  onExternalItemMoved($items, $partFrom, $partTo, $indexFrom, $indexTo){
       //must check because library appends the item in the array before calling callback
      if (this.cardItemList.isItemDuplicated($items, 0)){
        this.Snack.showError('One or more items are already in section');
        $partTo.splice($indexTo,$items.length);
        return;
      }


      console.log('on external item moved here', $items, $partFrom, $partTo, $indexFrom, $indexTo);

      let promises = [];
      this.Spinner.show("item-move");
      let position = 0;
      if ($indexTo > 0){
        position = $partTo[$indexTo-1].position;
        if ($partTo.length > $indexTo + $items.length){
          position+= ($partTo[$indexTo+$items.length].position - position)/2;
        } else {
          position+=1000;
        }
      }

      $items.forEach(($item)=>{
        $item.position = position;
        let $i = angular.copy($item.item);
        //only idd items that are not in the list yet
        $i.position = position;
        $i.sectionId = this.section.id;
        $i.menuId = this.section.menuId;
        promises.push(this.section.moveItem($i));
      })
      this.$q.all(promises).then((items)=>{
        // this is needed because of $scope.results array on search. drag an drop list must use results so end array is not updated
        // this.items.splice($indexTo,0,...items);
        items.forEach((newItem)=>{
          // this.items.push({item:newItem, id:newItem.id, position:newItem.position})
          this.onItemCreated(newItem, true);
          this.cardItemList.onItemCreated({item:this.ItemService.getById(newItem.id), $show:true, id:newItem.id, position:newItem.position});
        })
        return this.doSimpleSort($partTo);
      }).then(()=>{
        this.Snack.show('Items added');
        this.Spinner.hide("item-move");
      })
      .catch((err)=>{
        console.log("error", err);
        this.Snack.showError('Error adding item');
        this.Spinner.hide("item-move");
      })
  }

  onItemMoved($items, $partFrom, $partTo, $indexFrom, $indexTo){

    if ($partFrom == $partTo){
      this.Spinner.show("item-move");
      this.doSimpleSort($partTo).then(() => {

        this.Snack.show('Item moved');
      }, () => {

        this.Snack.showError('Error moving item');
      }).then(() => {

        this.Spinner.hide("item-move");
        this.recalculateHeight();
      })
    }
  }

  doSimpleSort($items) {

    let promises = [];

    $items.forEach(($item, index) => {

      let copy = angular.copy($item);
      copy.sectionId = this.section.id;
      copy.position = index * 1000;
      copy.menuId = this.section.menuId;
      $item.position = copy.position;

      promises.push(copy.update());
    });

    return this.$q.all(promises);
  }

  getPosition(item) {

    return this.items.filter((i)=>i.id===item.id)[0].position;
  }

  recalculateHeight() {

    this.section.$expanding = true;
    let maxHeight = 0;
    this.items.forEach((i)=>{
     maxHeight += 48 + 42 + 16 + (i.$size && i.$size.items ? i.$size.items.length * 35 : 0)
    })
    this.el[0].style.maxHeight = maxHeight + (80 + 35*5) + "px";
  }    

  constructor($scope, $q, Snack, Spinner, $stateParams, ItemService, $timeout) {
    "ngInject";

    this.$scope = $scope;
    this.Snack = Snack;
    this.$stateParams = $stateParams;
    this.Spinner = Spinner;
    this.$q = $q;
    this.items = this.items === undefined ? [] : this.items;
    this.ItemService = ItemService;
    this.$timeout = $timeout;

    this.items.forEach((i)=>i.$show = false);

    this.section.$expanding = false;

    $scope.$watch('menuSectionItemListCtrl.section.$expanded',(newVal, oldVal)=>{

      if(newVal) { // if expanded = true;
        this.items.forEach((i)=>i.$show = true)
        if (this.items.length === 0){
          this.recalculateHeight();
        }
      } else if (oldVal) { //if expanded = false and it was true
        this.el[0].style.maxHeight = 0;
        this.section.$expanding = true;
        $timeout(()=>{
          this.items.forEach((i)=>i.$show = false)
          this.section.$expanding = false;
        }, 1000);
      }
    })
  }
}
