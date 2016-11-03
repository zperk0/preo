'use strict';

export default class DeliveryZoneService {

  static get UID(){
    return "DeliveryZoneService";
  }

  saveEditableDeliveryZone(){
    function _handleError(){
      console.log("delivery-zones",err)
      this.Spinner.hide("delivery-zones-save");
      this.Snack.showError(this.LabelService.SNACK_DELIVERY_ZONES_ERROR)
    }
    return this.$q((resolve, reject)=>{
       this.Spinner.show("delivery-zones-save");
      //TODO save delivery zone
      console.log("saving", this.editableDeliveryZone);
      setTimeout(()=>{
        var dz  = this.editableDeliveryZone;
        dz.setId = this.data.deliveryZones.length;
        this.data.deliveryZones.push(dz);
        this.Spinner.hide("delivery-zones-save");
        this.Snack.show(this.LabelService.SNACK_DELIVERY_ZONES_SUCCESS)
        resolve(dz);
      },500)
    })
  }

  setEditableDeliveryZone(dz){
    console.log("set editable",dz);
    this.editableDeliveryZone=dz;
  }

  prepareZones(){
    this.data.deliveryZones.forEach((dz,i)=>{
      dz.$color = this.colors[i];
    })
  }

  getDeliveryZones(){
    //TODO Preoday.DeliveryZones.get(VenueService.currentVenue.id)
    return this.$q((resolve,reject)=>{
      this.data = {
        deliveryZones:[ {id:1, type:'DISTANCE', visible:1, name:'dz1', fee:{amount:1}, distance:7}, {id:2, name:'dz2', type:'CUSTOM', fee:{}}]
      }
      this.prepareZones();
      resolve(this.data);
    })
  }

  updateDeliveryZone(dz){
    return this.$q((resolve,reject)=>{
      setTimeout(()=>{
        resolve(dz);
      },500)
    });
  }

  showCreateDeliveryZone(){
    var index = this.data.deliveryZones.length
    this.editableDeliveryZone= {
      name:this.gettextCatalog.getString("Delivery Zone ") + (index+1),
      distance:2,
      visible:1,
      type:'DISTANCE',
      fee:{
        amount:0
      },
      $color:this.colors[index]
    }
    this.contextual.showDrawer('deliveryZonesEdit');
  }

  delete(dz){
    //TODO return dz.delete().then(()=>{this.data.deliveryZones = this.data.deliveryZones.filter((i)=>i.id!=dz.id); this.prepareZones();});
     return this.$q((resolve, reject)=>{

      setTimeout(()=>{
        this.data.deliveryZones = this.data.deliveryZones.filter((i)=>i.id!=dz.id)
        this.prepareZones();
        resolve();
      },500)
    })
  }

  constructor($q, VenueService, Spinner, Snack, LabelService, gettextCatalog, contextual) {
    "ngInject";
    this.$q = $q;
    this.VenueService = VenueService;
    this.LabelService = LabelService;
    this.contextual = contextual;
    this.gettextCatalog = gettextCatalog;
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.taxGroups = false
    this.data = {
      deliveryZones:[]
    }
    this.colorOpacity = 0.15;
    this.colors =[ {border:'#FFAB00', center:'rgba(255, 171, 0, 0.15)'},{border:"#F8A787", center:'rgba(248, 167, 135, 0.15)'},{border:"#C0ADD4", center:'rgba(193, 173, 212, 0.15)'},{border:"#9DD7D0", center:'rgba(157, 215, 208, 0.15)'},{border:"#98C6FE", center:'rgba(152, 198, 254, 0.15)'}];
    this.editableDeliveryZone=false;
  }
}
