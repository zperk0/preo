export default class menuItemListController {
  static get UID(){
    return "menuItemListController"
  }


  onExternalItemMoved($items, $partFrom, $partTo, $indexFrom, $indexTo){
       //must check because library appends the item in the array before calling callback
      if (this.cardItemList.isItemDuplicated($items, 1)){
        this.Snack.showError('One or more items are already in section');
        $partTo.splice($indexTo,$items.length);
        return;
      }
      let promises = [];
      this.Spinner.show("item-move");
      $items.forEach(($item)=>{
        let $i = angular.copy($item);
        //only idd items that are not in the list yet
        $i.position = 0
        $i.sectionId = this.section.id;
        $i.menuId = this.section.menuId;
        promises.push(this.section.moveItem($i));
      })
      this.$q.all(promises).then((items)=>{
        // this is needed because of $scope.results array on search. drag an drop list must use results so end array is not updated
        // this.items.splice($indexTo,0,...items);
        items.forEach((newItem)=>{
          this.onItemCreated(newItem, true);
          this.cardItemList.onItemCreated(this.ItemService.getById(newItem.id));
        })
        let promises = this.doSimpleSort($partTo);
        return this.$q.all(promises);
      }).then(()=>{
        this.sortData();
        this.Snack.show('Items added');
        this.Spinner.hide("item-move");
      })
      .catch((err)=>{
        console.log("error", err);
        this.Snack.showError('Error adding item');
        this.Spinner.hide("item-move");
      })
  }

  doSimpleSort($items){
   let promises = [];
    $items.forEach(($item, index)=>{
      let copy = angular.copy($item);
      copy.sectionId = this.section.id;
      copy.position=index*1000;
      this.sort.filter((s)=>s.id===copy.id)[0].position=copy.position;
      copy.menuId = this.section.menuId;
      promises.push(copy.update());
    });
    return promises;
  }

  onItemMoved($items, $partFrom, $partTo, $indexFrom, $indexTo){
    if ($partFrom == $partTo){
      this.Spinner.show("item-move");
      let promises = this.doSimpleSort($partTo);
      this.$q.all(promises).then(()=>{
        this.Snack.show('Item moved');
      }, ()=>{
        this.Snack.showError('Error moving item');
      }).then(()=>{
        this.Spinner.hide("item-move");
        this.recalculateHeight();
      })
    }

  }

  onItemCreated(newItem, skipSort = false){
    if (this.sort && this.sort.filter((i)=>i.id===newItem.id).length === 0){
      this.sort.push({id:newItem.id, position:newItem.position})
    }
    this.recalculateHeight();
    if(!skipSort)
      this.sortData();
  }

  onItemUpdated(){
    this.recalculateHeight();
  }

  deleteItem(item){
    this.cardItemList.deleteItem(item);
  }

  onItemDeleted(deletedItem){
    console.log("deleted");
    this.sortData();
  }

  getPosition(item){
    return item.position || this.sort ? this.sort.filter((i)=>item.id===i.id)[0].position : 0;
  }

  showCreateItem($event, isImport){

    let newItem = {
        $selected:true,
        quantity:1,
        $size:0,
        $show:true,
        visible:1,
        tags:[],
        images:[],
        position:0,
        venueId:this.$stateParams.venueId
    };

    if(!isImport){
      let isCreating = false;
        this.items.forEach((s, index)=>{
          if (!s.id){
            isCreating = true;
          }
        });
        if (isCreating){
          return;
        }
      if (this.sort && this.sort.length){
        newItem.position = Math.max.apply(Math,this.sort.map(function(o){return o.position;})) + 1000
      }
      this.items.push(newItem);
    } else {
      this.contextual.showDrawer('items');
    }

    $event.stopPropagation();
  }

  sortData(){
      if (!this.sort || !this.sort.length || !this.items || !this.items.length){
        return;
      }

      this.items.sort((a,b)=> {
        var a1 = this.sort.filter((i)=>i.id===a.id)[0]
        var b1 = this.sort.filter((i)=>i.id===b.id)[0]
        return a1 && b1 && (a1.position-b1.position === 0 ? a1.id-b1.id : a1.position-b1.position);
      })
  }

  recalculateHeight(){
    this.section.$expanding = true;
    let maxHeight = 0;
    this.items.forEach((i)=>{
     maxHeight += 48 + 42 + 16 + (i.$size && i.$size.items ? i.$size.items.length * 35 : 0)
    })
    this.el[0].style.maxHeight = maxHeight + (80 + 35*5) + "px";
  }


  constructor($scope, $q, Snack, Spinner, $stateParams, UtilsService, contextual, DialogService, LabelService, ItemService, $timeout) {
    "ngInject";
    this.$scope = $scope;
    this.Snack = Snack;
    this.$stateParams = $stateParams;
    this.Spinner = Spinner;
    this.UtilsService = UtilsService;
    this.$q = $q;
    this.items = this.items === undefined ? [] : this.items;
    this.contextual = contextual;
    this.LabelService = LabelService;
    this.DialogService = DialogService;
    this.ItemService = ItemService;
    this.$timeout = $timeout;
    if (!this.section){
      this.section = {};
      this.items.forEach((i)=>i.$show = true)
    } else {
      this.items.forEach((i)=>i.$show = false)
    }
    this.section.$expanding = false;
    //watch for animation only if we're in a section
    if (this.section.id){
      $scope.$watch('vm.section.$expanded',(newVal, oldVal)=>{
        if(newVal){ // if expanded = true;
          this.items.forEach((i)=>i.$show = true)
          this.sortData();
          if (this.items.length === 0){
            this.recalculateHeight();
          }
        } else if (oldVal){ //if expanded = false and it was true
          this.el[0].style.maxHeight = 0;
          this.section.$expanding = true;
          $timeout(()=>{
            this.items.forEach((i)=>i.$show = false)
            this.section.$expanding = false;
          }, 1000)

        }
      })
    }

  }
}
