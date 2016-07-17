export default class menuItemListController {
  static get UID(){
    return "menuItemListController"
  }


  onExternalItemMoved($items, $partFrom, $partTo, $indexFrom, $indexTo){
    console.log("on external moved");
       //must check because library appends the item in the array before calling callback
      if (this.cardItemList.isItemDuplicated($items, 0)){
        this.Snack.showError('One or more items are already in section');
        $partTo.splice($indexTo,$items.length);
        return;
      }
      let promises = [];
      this.Spinner.show("item-move");
      $items.forEach(($item)=>{
        let $i = angular.copy($item);
        //only idd items that are not in the list yet
        $i.position = this.cardItemList.calculateNewItemPos($item);
        $i.menuId = this.section.menuId;
        promises.push(this.section.moveItem($i));
      })
      this.$q.all(promises).then((items)=>{
          // this is needed because of $scope.results array on search. drag an drop list must use results so end array is not updated
          this.items.splice($indexTo,0,...items);
          return this.cardItemList.onSimpleSort()
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
    console.log("on item moved");
    if ($partFrom == $partTo){
      this.Spinner.show("item-move");
      this.cardItemList.onItemsMoved($items, $indexFrom, $indexTo).then(()=>{
        this.Snack.show('Item moved');
      }, ()=>{
        this.Snack.showError('Error moving item');
      }).then(()=>{
        this.Spinner.hide("item-move");
      })
    }

  }

  showCreateItem($event, isImport){
    console.log("show creating", $event, isImport);

    let newItem = {
        $selected:true,
        quantity:1,
        $size:0,
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
      if (this.items && this.items.length){
        newItem.position = Math.max.apply(Math,this.items.map(function(o){return o.position;})) + 1000
      }
      this.items.push(newItem);
    } else {
      this.contextual.showDrawer('items');
    }

    $event.stopPropagation();
  }

  repeatReady(){
    console.log("true 1")
    this.section.$expanding = true;
    this.el[0].style.maxHeight = (this.items.length+1) * 80 + "px";
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
    this.itemsDisplayed = [];
    this.$timeout = $timeout;
    this.timeoutClear;
    if (!this.section){
      this.section = {};
    }
    this.section.$expanding = false;

    $scope.$watch('vm.section.$expanded',(newVal, oldVal)=>{

      if(newVal){
        this.itemsDisplayed = this.items;
        if (this.itemsDisplayed.length === 0){
          this.repeatReady();
        }
      } else {
        this.el[0].style.maxHeight = 0;
        if (newVal !== undefined && oldVal !== undefined){
          console.log("in watch", this.section, newVal, oldVal)
          this.section.$expanding = true;
        } else {
          this.section.$expanding = false;
        }
        $timeout(()=>{
          this.itemsDisplayed = [];
        }, 1000)

      }
    })

  }
}
