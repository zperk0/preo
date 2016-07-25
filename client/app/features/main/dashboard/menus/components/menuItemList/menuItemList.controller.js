export default class menuItemListController {
  static get UID(){
    return "menuItemListController"
  }


  onExternalItemMoved($items, $partFrom, $partTo, $indexFrom, $indexTo){
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
        $i.position = $indexTo === 0 ? 0 : this.cardItemList.calculateNewItemPos($indexTo-1);
        $i.menuId = this.section.menuId;
        promises.push(this.section.moveItem($i));
      })
      this.$q.all(promises).then((items)=>{
          // this is needed because of $scope.results array on search. drag an drop list must use results so end array is not updated
          // this.items.splice($indexTo,0,...items);

          items.forEach((newItem)=>{
            this.cardItemList.onItemCreated(this.ItemService.getById(newItem.id));
          })
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
      this.cardItemList.onItemsMoved($items, $indexFrom, $indexTo).then(()=>{
        this.Snack.show('Item moved');
      }, ()=>{
        this.Snack.showError('Error moving item');
      }).then(()=>{
        this.Spinner.hide("item-move");
        this.recalculateHeight();
      })
    }

  }

  onItemCreated(){
    this.recalculateHeight();
  }

  onItemCloned(){
    this.recalculateHeight();
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

  recalculateHeight(){
    this.section.$expanding = true;
    let maxHeight = 0;
    this.items.forEach((i)=>{
     maxHeight += 48 + 42 + 16 +(i.$size && i.$size.items ? i.$size.items.length * 35 : 0)
    })
    this.el[0].style.maxHeight = maxHeight+80 + "px";
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
      this.itemsDisplayed = this.items;
    }
    this.section.$expanding = false;

    //watch for animation only if we're in a section
    if (this.section.id){
      $scope.$watch('vm.section.$expanded',(newVal, oldVal)=>{

        if(newVal){
          this.itemsDisplayed = this.items;
          if (this.itemsDisplayed.length === 0){
            this.recalculateHeight();
          }
        } else{
          this.el[0].style.maxHeight = 0;
          if (newVal !== undefined && oldVal !== undefined){
            this.section.$expanding = true;
          } else {
            this.section.$expanding = false;
          }
          $timeout(()=>{
            if (this.section.id){
              this.itemsDisplayed = [];
            }
          }, 1000)

        }
      })
    }

  }
}
