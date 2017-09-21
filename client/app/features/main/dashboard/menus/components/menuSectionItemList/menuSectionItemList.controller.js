export default class menuSectionItemListController {

  static get UID(){
    return "menuSectionItemListController"
  }

  onItemCreated(newItem) {

    newItem.sectionId = this.section.id;
    newItem.menuId = this.section.menuId;
  }

  onItemDeleted(item) {

    this.cardItemList.deleteItem(item);
  }

  showCreateItem($event, isImport){

    let currentMenu = this.section.getMenu();
    let newItem = this.ItemService.getNewItemBase(this.$stateParams.venueId, currentMenu.isVoucher());

    if(!isImport){
      let isCreating = this.items.filter((s, index) => {

        return !s.id;
      }).length > 0;

      if (isCreating){
        return;
      }

      if (this.items && this.items.length && this.section.id){
        newItem.sectionId = this.section.id;
        newItem.menuId = this.section.menuId;
        newItem.position = Math.max.apply(Math,this.items.map(function(o){return o.position;})) + 1000;
      }
      this.items.push(newItem);
    } else {
      this.contextual.showDrawer('items');
    }

    $event.stopPropagation();
  }

  onExternalItemMoved($items, $partFrom, $partTo, $indexFrom, $indexTo) {
       //must check because library appends the item in the array before calling callback
      if (this.cardItemList.isItemDuplicated($items, 0)){
        this.Snack.showError('One or more items are already in section');
        return;
      }

      if ($items.length && $items[0].modifiers && this.section.modifiers && this.section.modifiers.length) {
        if (this.ModifierService.isModifiersDuplicated($items[0].modifiers, this.section)) {
          return this.showSectionHasModifierDialog($items, $partFrom, $partTo, $indexFrom, $indexTo);
        }
      }

      return this.moveExternalItem($items, $partFrom, $partTo, $indexFrom, $indexTo);
  }

  showSectionHasModifierDialog ($items, $partFrom, $partTo, $indexFrom, $indexTo) {

    this.DialogService.show(this.ErrorService.SECTION_HAS_MODIFIER_ON_MOVE.title, this.ErrorService.SECTION_HAS_MODIFIER_ON_MOVE.message, [{
        name: this.gettextCatalog.getString('Got it')
      }]).then(()=>{

        this.moveExternalItem($items, $partFrom, $partTo, $indexFrom, $indexTo);
      });
  }

  moveExternalItem ($items, $partFrom, $partTo, $indexFrom, $indexTo) {

    let promises = [];
    this.Spinner.show("item-move");
    let position = 0;
    if ($indexTo > 0) {
      position = $partTo[$indexTo-1].position;
    } else if ($partTo && $partTo.length) {
      $partTo[0].position += 1;
    }

    $items.forEach(($item)=>{
      $item.position = position;
      let $i = angular.copy($item);
      //only idd items that are not in the list yet
      $i.position = position;
      $i.sectionId = this.section.id;
      $i.menuId = this.section.menuId;
      promises.push(this.section.moveItem($i));
    })
    this.$q.all(promises).then((items)=>{
      items.forEach((newItem)=>{

        newItem.$show = true;
        this.cardItemList.onItemCreated(newItem);
      });
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

    return item.position;
  }

  onClone (item, sectionId) {

    this.Spinner.show("item-clone");

    let clonePosition = this.getPosition(item);

    this.ItemService.cloneItem(item, this.section.id, clonePosition)
      .then((createdItem)=>{

        createdItem.setSize();

        createdItem.$show = true; //need show for animation
        this.Spinner.hide("item-clone")
        this.Snack.show('Item duplicated');
        console.log("cloned", createdItem, this.item);

        this.cardItemList.insert(item, createdItem, this.section);
        this.doSimpleSort(this.items);

      }, (err)=>{
        console.log("failed creating item", err)
        this.Spinner.hide("item-clone")
        this.Snack.showError('Failed duplicating item');
      });
  }

  setMaxHeight(maxHeight) {
    angular.element(this.$element[0]).css('max-height', maxHeight);
  }

  getHeight() {
    const container = angular.element(this.$element[0].querySelector('.container'));
    return container && container.length ? container[0].offsetHeight : 0;
  }

  expand(status) {
    this.section.$expanded = status;

    if (status) {
      this.items.forEach((i)=>i.$show = true);
    } else {
      this.runAnimation();
    }
  }

  runAnimation() {
    if (this.section.$expanded === this.lastVal) {
      return;
    }
    this.lastVal = this.section.$expanded;
    this.section.$expanding = true;
    
    if (!this.section.$expanded) {
      this.setMaxHeight(this.getHeight() + 'px');
    }

    this.$timeout(() => this.setMaxHeight((this.section.$expanded ? this.getHeight() : 0) + 'px'));
    this.$timeout(() => this.afterAnimation(), 500);
  }

  afterAnimation() {
    if (this.section.$expanded) {
      this.setMaxHeight('max-content');
    } else {
      this.items.forEach((i)=>i.$show = false);
    }
    this.section.$expanding = false;
  }

  setAnimation() {
    this.$scope.$watch('menuSectionItemListCtrl.section.$expanded', newVal => {
      this.expand(Boolean(newVal));
    });
  }

  constructor($scope, $q, Snack, Spinner, $stateParams, ItemService, $timeout, contextual, ModifierService, DialogService, ErrorService, gettextCatalog, $element) {
    "ngInject";

    this.$scope = $scope;
    this.Snack = Snack;
    this.$stateParams = $stateParams;
    this.Spinner = Spinner;
    this.$q = $q;
    this.items = this.items === undefined ? [] : this.items;
    this.ItemService = ItemService;
    this.$timeout = $timeout;
    this.contextual = contextual;
    this.ModifierService = ModifierService;
    this.DialogService = DialogService;
    this.ErrorService = ErrorService;
    this.gettextCatalog = gettextCatalog;
    this.$element = $element;

    this.setAnimation();
  }
}
