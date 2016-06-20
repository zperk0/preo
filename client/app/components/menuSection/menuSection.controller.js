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
    console.log("this", this.section)
    let originalItem = this.section.items[$index];
    let sectionNewIndex = -1;

    //find the new section index by comparing ids, first match with a different $index is the new position of the section
    this.section.items.forEach((s,index)=>{
      if (sectionNewIndex === -1 && s.id === originalItem.id && index !== $index){
        sectionNewIndex = index;
      }
    })

    // Remove Section from array to be repositioned
    this.section.items.splice($index, 1);

    // we changed the array, if the Object is after the Section, we just changed the index of the section by one, removing one fixes that
    if (sectionNewIndex > $index){
      sectionNewIndex-=1;
    }

    // Remove Object created by library and position section in it's place
    this.section.items.splice(sectionNewIndex, 1, originalItem);

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
      });
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
    return this.$q((resolve, reject)=>{
      this.section.update()
        .then(()=>{
          this.Snack.show('Section updated');
          resolve();
      },()=>{
        reject();
        this.Snack.showError('Error saving section');
      });

      console.log("resolved");
    });
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
            that.section.delete()
              .then(()=>{
                that.Snack.show('Section deleted');
                that.menuCtrl.deleteSection(that.section);
              }, ()=>{
                console.log("error deleting section");
                that.Snack.showError('Error deleting section');
              })

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

  /* @ngInject */
  constructor($rootScope, $q, BroadcastEvents, DialogService, Snack, $stateParams, LabelService) {
    'ngInject';
    this.$q =$q;
    this.Snack = Snack;
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
