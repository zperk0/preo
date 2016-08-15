export default class outletController {
  static get UID(){
    return "outletController"
  }

  restoreOriginalValues(){
    if (this.originalOutlet){
      angular.extend(this.outlet, this.originalOutlet)
      this.originalOutlet = false;
    }
  }  

  contextualMenuCancel(){
    this.restoreOriginalValues();
    this.outlet.$selected = false;

    if (this.outlet && !this.outlet.id) {
      this.cardItemList.deleteItem(this.outlet);
    }    
  }

  contextualMenuSuccess(entity){
    if (this.outlet && entity && entity.name){
      this.outlet = entity;

      if (this.outlet.$menuId) {
      	this.outlet.menus = [this.MenuService.getMenuById(this.outlet.$menuId)];
      } else {
      	this.outlet.menus = [];
      }

      if (!this.outlet.id){
        this.Spinner.show("outlet-create");
        this.outletListCtrl.createOutlet(this.outlet)
          .then((_outlet)=>{

            this.outlet.$deleted = false;
            this.outlet.$selected = false;
            
            this.$timeout(() => {

              this.cardItemList.onItemCreated(_outlet);
              this.contextualMenu.hide();
              this.Spinner.hide("outlet-create");
              this.Snack.show('Outlet created');              
            });
          }, (err)=>{
            console.log('error on save outlet', err);
            this.Spinner.hide("outlet-create");
            this.Snack.showError('Error saving outlet');
          })

      } else {
        this.updateOutlet().then(()=>{
          this.contextualMenu.hide();
          this.outlet.$selected = false;
        })
      }
    }
  }  

  updateOutlet(){

    this.Spinner.show("outlet-update");
    return this.$q((resolve, reject)=>{
      this.outlet.update()
        .then((o)=>{
          this.Snack.show('Outlet updated');
          resolve(o);
      },()=>{
        reject();
        this.Snack.showError('Error saving outlet');
      }).then(()=>{
        this.Spinner.hide("outlet-update");
      })
    });
  }

  onEdit ($event) {

    if (this.outlet.menus && this.outlet.menus.length) {
      this.outlet.$menuId = this.outlet.menus[0].id;
    }

    this.originalOutlet  = angular.copy(this.outlet);
    this.cardItemList.selectItem(this.outlet);
    this.contextual.showMenu(this.type, this.outlet, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
    $event.stopPropagation();
  }    

  onDelete(){
    
    this.DialogService.delete(this.LabelService.TITLE_DELETE_OUTLET, this.LabelService.CONTENT_DELETE_OUTLET)
      .then(()=>{
        this.contextual.hide();
        this.outletListCtrl.deleteOutlet(this.outlet);
      })
  }  

  constructor($q, $timeout, Spinner, Snack, contextualMenu, contextual, MenuService, DialogService, LabelService) {
  	"ngInject";

    this.$q = $q;
  	this.$timeout = $timeout;
  	this.Spinner = Spinner;
  	this.Snack = Snack;
  	this.contextualMenu = contextualMenu;
  	this.contextual = contextual;
  	this.DialogService = DialogService;
  	this.LabelService = LabelService;
  	this.MenuService = MenuService;

  	this.type = 'outlet';

    if (this.outlet && !this.outlet.id) {
        this.contextual.showMenu(this.type, this.outlet, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
    }    
  }
}
