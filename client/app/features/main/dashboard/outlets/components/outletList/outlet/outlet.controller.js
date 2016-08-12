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

      if (!this.outletLocation.id){
        this.outletListCtrl.createOutlet(this.outlet)
          .then((_outlet)=>{

            this.outlet.$selected = false;
            this.contextualMenu.hide();
            this.Snack.show('Outlet created');
          }, (err)=>{
            console.log('error on save outlet', err);
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

  /* @ngInject */
  constructor(Spinner, Snack, contextualMenu, contextual) {
  	"ngInject";

  	this.Spinner = Spinner;
  	this.Snack = Snack;
  	this.contextualMenu = contextualMenu;
  	this.contextual = contextual;

  	this.type = 'outlet';

    if (this.outlet && !this.outlet.id) {
        this.contextual.showMenu(this.type, this.outlet, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this));
    }    
  }
}
