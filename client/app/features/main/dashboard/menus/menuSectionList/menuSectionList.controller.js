export default class menuSectionListController {
  static get UID(){
    return "menuSectionListController"
  }

  onSectionMoved($items, $partFrom, $partTo, $indexFrom, $indexTo){
    //update all sections
    this.Spinner.show("section-move");
    console.log("on section moved, updating", this.cardItemList);
    this.cardItemList.onSimpleSort().then(()=>{
      this.Snack.show(this.gettextCatalog.getString('Section moved'));
    }, ()=>{
      this.Snack.showError(this.gettextCatalog.getString('Error moving section'));
    }).then(()=>{
      this.Spinner.hide("section-move");
    })
  }

  showCreateSection() {

    let isCreating = this.sections.filter((s, index) => {

      return s.id === undefined;
    }).length > 0;

    if (isCreating) {
      console.log("Not showing section new, already showing")
      return;
    }

    let section = new Preoday.Section({
      menuId:this.menu.id,
      $selected:true,
      visible:1,
      items: [],
      position: this.sections && this.sections.length ? (this.sections[this.sections.length-1]).position + 1000 : 0
    }, this.menu);

    this.sections.push(section);
  }

  deleteSection(section){
    this.Spinner.show("section-delete");
    section.delete()
      .then(()=>{
        this.Snack.show('Section deleted');
        return this.cardItemList.deleteItem(section)
      }).then(()=>{
        this.Spinner.hide("section-delete");
      }).catch(()=>{
        this.Snack.showError(this.gettextCatalog.getString('Error deleting section'));
        this.Spinner.hide("section-delete");
      })
  }
  repeatDone() {

    this.$timeout(()=>{
      this.Spinner.hide("section-loading");
    })
  }

  /* @ngInject */
  constructor($timeout, $q, Spinner, Snack, gettextCatalog) {
    "ngInject";
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.$q = $q;
    this.$timeout = $timeout;
    this.gettextCatalog = gettextCatalog;

    if (this.sections && this.sections.length){
      this.sections.forEach((s)=>s.$expanded = false)
      this.Spinner.show("section-loading");
    }
  }
}
