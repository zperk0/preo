export default class menuSectionListController {
  static get UID(){
    return "menuSectionListController"
  }

  onSectionMoved($items, $partFrom, $partTo, $indexFrom, $indexTo){
    //update all sections
    this.Spinner.show("section-move");
    console.log("on section moved, updating");
    this.cardItemList.onSimpleSort().then(()=>{
      this.Snack.show('Section moved');
    }, ()=>{
      this.Snack.showError('Error moving section');
    }).then(()=>{
      this.Spinner.hide("section-move");
    })
  }


  addSectionInPosition(section){
    let indexBefore = -1;
    this.sections.forEach((s, index)=>{
      if (s.position <= section.position){
        indexBefore = index;
      }
    })
    this.sections.splice(indexBefore+1, 0, section);
  }

  createSection(newData){
    this.Spinner.show("section-create");
    return Preoday.Section.save(newData)
        .then((section)=>{
          this.cardItemList.clearPossibleNewItem();
          this.addSectionInPosition(section)
          this.Spinner.hide("section-create");
          return section;
      })
  }

  showCreateSection(){
    let isCreating = false;
    this.sections.forEach((s, index)=>{
      if (s.id === undefined){
        isCreating = true;
      }
    });
    if (isCreating){
      console.log("Not showing section new, already showing")
      return;
    }
    let section = {
      menuId:this.menu.id,
      $selected:true,
      visible:1,
      position: this.sections && this.sections.length ? (this.sections[this.sections.length-1]).position + 1000 : 0
    };

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
        this.Snack.showError('Error deleting section');
        this.Spinner.hide("section-delete");
      })
  }

  /* @ngInject */
  constructor($timeout, $q, Spinner, Snack) {
    "ngInject";
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.$q = $q;
    this.$timeout = $timeout;
  }
}
