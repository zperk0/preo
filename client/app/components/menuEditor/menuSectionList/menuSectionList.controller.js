export default class menuSectionListController {
  static get UID(){
    return "menuSectionListController"
  }

  calculateNewSectionPos(sectionBefore){

    var pos = -1;

    //if we have a section before, we should add it after this section
    if (sectionBefore){
      this.sections.forEach((s,index)=>{
        if (s.id === sectionBefore.id){
          pos = sectionBefore.position;
          let sectionAfter = this.sections[index+1];
          if (!sectionAfter) {
            //if we don't get a section after we're in the last section, just add 1000
            pos+=1000;
          } else {
            //else new section pos is the middle of section after and section before
            pos += (sectionAfter.position - pos)/2
          }
        }
      })
      if (pos !== -1) {
        //if we have a pos return it
        return pos;
      }
    }
    //default is last section size + 1000
    return  this.sections && this.sections.length ? (this.sections[this.sections.length-1]).position + 1000 : 0;
  }

  onSectionMoved($items, $partFrom, $partTo, $indexFrom, $indexTo){
    //update all sections
    this.Spinner.show("section-move");
    console.log("on section moved, updating");
    const promises = [];
    this.sections.forEach((s, index)=>{
      s.position=index*1000;
      promises.push(s.update());

    });
    this.$q.all(promises).then(()=>{
      this.Snack.show('Section moved');
    }, ()=>{
      this.Snack.showError('Error moving section');
    }).then(()=>{
      this.Spinner.hide("section-move");
    })
  }

  clearPossibleNewSection(){
    // remove section with id -1, (possible new section)
    if (this.sections){
      let deletedIndex = -1;
      this.sections.forEach((s,i)=>{
        if (s.id === undefined){
          s.$deleted = true;
          deletedIndex = i;
        }
      })
      if (deletedIndex > -1){
        this.$timeout(()=>{
          this.sections.splice(deletedIndex,1);
        },1000)
      }
    }
  }

  cloneSection(sectionToClone){
    const newSectionData = angular.copy(sectionToClone);
    newSectionData.position = this.calculateNewSectionPos(sectionToClone);
    return this.$q((resolve, reject)=>{
      this.createSection(newSectionData)
        .then(()=>{
          this.Snack.show('Section duplicated');
          resolve();
        }, ()=>{
          this.Snack.showError('Error duplicating section');
          reject();
        });
    });
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
    return this.$q((resolve, reject)=>{
      Preoday.Section.save(newData)
        .then((section)=>{
          this.clearPossibleNewSection();
          this.addSectionInPosition(section);
          resolve();
      },()=>{
        reject();
      }).then(()=>{
        this.Spinner.hide("section-create");
      })
    });
  }

  showCreateSection($event){
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
    console.log("Showing section new")
    let section = {
      menuId:this.menu.id,
      $selected:true,
      visible:1,
      position:this.calculateNewSectionPos()
    };
    this.sections.push(section);
    $event.stopPropagation();
  }

  deleteSection(section){
    this.Spinner.show("section-delete");
    section.delete()
      .then(()=>{
        this.Snack.show('Section deleted');
        if (this.sections){
          this.sections = this.sections.filter((s)=>section.id !== s.id);
        }
      }, ()=>{
        this.Snack.showError('Error deleting section');
      }).then(()=>{
        this.$timeout(()=>{
          this.Spinner.hide("section-delete");
        })
      })
  }

  selectSection(section){
    // this.clearPossibleNewSection();
    this.sections.forEach((s, index)=>{
      if (section && s.id === section.id){
        s.$selected = true;
      } else{
        s.$selected=false;
      }
    });
  }

  expandSection(section){
    this.sections.forEach((s)=>{
      if (s.id === section.id){
        s.$expanded = !s.$expanded;
      } else {
        s.$expanded = false;
      }
    });
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
