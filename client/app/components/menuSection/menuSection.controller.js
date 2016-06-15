export default class menuSectionController {
  static get UID(){
    return "menuSectionController";
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
    this.menuCtrl.selectSection(this.section);
    this.menuCtrl.toggleContextualMenu(this.section,this.type, this.createSection.bind(this));
    this.toggleCardActions($event);
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

  onVisibility(newStatus, $event){
    this.section.visible = newStatus ? 1 : 0;
    this.saveSection();
    $event.stopPropagation();
  }

  onClone($event){
    const newSectionData = angular.copy(this.section);
    newSectionData.position = this.menuCtrl.menu.sections.length * 1000;
    this.createSection(newSectionData); //will create a new section with this section as data
    $event.stopPropagation();
  }

  onDelete($event){
    this.DialogService.delete("Delete section?", "Are you sure you want to delete this section? The items in this section will not be deleted.")
      .then(()=>{
        console.log("this.section delete", this.section)
        this.section.delete()
          .then(()=>{
            this.Snack.show('Section deleted');
            this.menuCtrl.deleteSection(this.section);
          }, ()=>{
            console.log("error deleting section");
            this.Snack.showError('Error deleting section');
          })

    })
    $event.stopPropagation();
  }

  onEdit($event){
    this.menuCtrl.selectSection(this.section);
    this.menuCtrl.toggleContextualMenu(this.section,this.type, this.saveSection.bind(this));
    this.toggleCardActions($event);
    $event.stopPropagation();
  }

  toggleCardActions($event){
    this.showCardActions=!this.showCardActions;
    $event.stopPropagation();
  }

  toggleExpanded(){
    this.expanded=!this.expanded;
  }

  /* @ngInject */
  constructor($rootScope, $q, BroadcastEvents, DialogService, Snack) {
    'ngInject';
    this.$q =$q;
    this.Snack = Snack;
    this.DialogService =DialogService;
    this.type = 'menuSection'; //type for contextual menu
    this.showCardActions = false;
    this.expanded = false;
    this.$selected = false;
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
