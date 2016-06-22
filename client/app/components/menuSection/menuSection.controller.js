  export default class menuSectionController {
  static get UID(){
    return "menuSectionController";
  }

    selectItem(item){
      this.section.items.forEach((i, index)=>{
        if (i.id === item.id){
          i.$selected = true;
        } else{
          i.$selected=false;
        }
      });
    }


  onItemMoved($index){
    //update all sections
    this.section.items.forEach((i, index)=>{
      i.position=index*1000;
      i.update();
    });
  }

  deleteItem(item){
    this.section.items = this.section.items.filter((i)=>item.id !== i.id);
  }
  createItem(newItem){
    this.section.items.push(newItem);
  }

  createSection(newData = false){
    this.Spinner.show("section-create");
    return this.$q((resolve, reject)=>{
      Preoday.Section.save(newData || this.section)
        .then((section)=>{
          this.Snack.show('Section created');
          console.log("created section", section);
          this.menuCtrl.createSection(section);
          if(!newData){
            delete this.section;
          }
          resolve();
      },()=>{
          reject();
        this.Snack.showError('Error saving section');
      }).then(()=>{
        this.Spinner.hide("section-create");
      })
    });
  }

  showCreateSection($event){
    if (!this.section || !this.section.id){
      this.section = {
        id:-1,
        menuId:this.menuId,
        $selected:true,
        position:this.menuCtrl.menu.sections.length * 1000
      };
    }
    this.menuCtrl.toggleContextualMenu(this.section,this.type, this.createSection.bind(this));
    $event.stopPropagation();
  }

  saveSection(){
    this.Spinner.show("section-save");
    return this.$q((resolve, reject)=>{
      this.section.update()
        .then(()=>{
          this.Snack.show('Section updated');
          resolve();
      },()=>{
        reject();
        this.Snack.showError('Error saving section');
      }).then(()=>{
        this.Spinner.hide("section-save");
      })

      console.log("resolved");
    });
  }

  deleteSection(){
    this.Spinner.show("section-delete");
    this.section.delete()
      .then(()=>{
        this.Snack.show('Section deleted');
        this.menuCtrl.deleteSection(this.section);
      }, ()=>{
        console.log("error deleting section");
        this.Snack.showError('Error deleting section');
      }).then(()=>{
        this.Spinner.hide("section-delete");
      })
  }

  toggleExpanded(){
    this.menuCtrl.expandSection(this.section);
    this.$stateParams.sectionId = this.section.id;
  }

  //sets action callbacks for <card-item-actions>
  setCardActions(){
    const that = this;
    this.cardItemActions={
      onClone: ($event) => {
        const newSectionData = angular.copy(that.section);
        newSectionData.position = that.menuCtrl.menu.sections.length * 1000;
        that.createSection(newSectionData); //will create a new section with this section as data
      },
      onEdit: ($event) => {
        that.menuCtrl.selectSection(that.section);
        that.menuCtrl.toggleContextualMenu(that.section,that.type, that.saveSection.bind(that));
      },
      onDelete: ($event)=>{
        that.DialogService.delete(that.LabelService.TITLE_DELETE_SECTION, that.LabelService.CONTENT_DELETE_SECTION)
          .then(()=>{
            that.deleteSection();
        })
        $event.stopPropagation();
      },
      onVisibility:(newStatus, $event)=>{
        that.section.visible = newStatus ? 1 : 0;
        that.saveSection();
        $event.stopPropagation();
      }
    }
  }

  constructor($rootScope, $q, BroadcastEvents, DialogService, Snack, $stateParams, LabelService, Spinner) {
    "ngInject";
    this.$q =$q;
    this.Snack = Snack;
    this.Spinner = Spinner;
    this.$stateParams = $stateParams;
    this.DialogService = DialogService;
    this.LabelService = LabelService;
    this.type = 'menuSection'; //type for contextual menu
    this.setCardActions();
    this.menuItemType = 'menuItem';
    this.allowedDropTypes = [this.menuItemType];

    $rootScope.$on(BroadcastEvents._ON_CLOSE_CONTEXTUAL_MENU,(event, entity, type)=>{
      if (this.section){
        if(entity && type=== this.type && entity.id === this.section.id){
          this.section = entity;
        }
      this.section.$selected = false;
      }
    });
  }
}
