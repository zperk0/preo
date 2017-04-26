export default class deliveryZoneController {
  static get UID(){
    return "deliveryZoneController";

  }


  onEdit ($event){
    this.originalItem  = angular.copy(this.deliveryZone);

    this.contextual.showDrawer('deliveryZonesEdit')
      .then(() => {

      }, () => {

        this.DeliveryZoneService.cancelEditing();
      });

    this.$timeout(() => {

      this.DeliveryZoneService.setEditableDeliveryZone(this.deliveryZone);
    });

  }

  onDelete ($event){
    const msg = this.DialogService.delete(this.LabelService.TITLE_DELETE_DELIVERY_ZONE, this.LabelService.CONTENT_DELETE_DELIVERY_ZONE)
        .then(()=>{
            this.Spinner.show("item-delete");
console.log('DELETE OK - sTEP 0');
            this.DeliveryZoneService.delete(this.deliveryZone).then(()=>{
              console.log('DELETE OK - sTEP 1');
                this.cardItemList.onItemDeleted(this.deliveryZone);
                if (this.onItemDeleted){
                  this.onItemDeleted({item:this.deliveryZone});
                }
                this.Snack.show('Delivery zone deleted');
                this.Spinner.hide("item-delete");
            })
            .catch((err)=>{
              console.log("Failed deleting delivery zone", err)
              this.Spinner.hide("item-delete")
              this.Snack.showError('Delivery zone not deleted');
            })
        });
  }

  onVisibility(newStatus){
    var dz  = angular.copy(this.deliveryZone);
    if (dz.polygon){
      dz.polygon = dz.polygon.toString();
    }
    dz.visible =  newStatus ? 1 : 0;
    this.Spinner.show("dz-update");
    dz.update()
      .then((newDz)=>{
        if (newDz.polygon && typeof newDz.polygon !== 'Array') {
          newDz.polygon = JSON.parse('[' + newDz.polygon + ']');
        }
        angular.extend(this.deliveryZone,newDz);
        this.Spinner.hide("dz-update");
        this.Snack.show('Delivery zone visibility updated');
    }).catch(()=>{
        // this.deliveryZone = angular.copy(this.dz)
        this.Spinner.hide("dz-update");
        this.Snack.showError('Delivery zone visibility not changed');
    })
  }

  constructor($scope, $q, Snack, DialogService, $stateParams, BroadcastEvents, $rootScope, LabelService, Spinner, $timeout, contextual, DeliveryZoneService) {
    "ngInject";
    this.$q =$q;
    this.$scope =$scope;
    this.Snack = Snack;
    this.Spinner = Spinner;
    this.DialogService = DialogService;
    this.LabelService = LabelService;
    this.contextual = contextual;
    this.DeliveryZoneService = DeliveryZoneService;
    this.$timeout = $timeout;
    this.newModifiers = [];
  }
}
