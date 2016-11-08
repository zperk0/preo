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
      // setTimeout(()=>{
        var dz  = angular.copy(this.editableDeliveryZone);
        if (dz.polygon){
          dz.polygon = dz.polygon.toString();
        }
        var saveOrUpdate = dz.id && dz.id !== -1 ? dz.update.bind(dz) : Preoday.DeliveryZone.create;

        // if (!dz.id){
        //   dz.id = this.data.deliveryZones.length;
        // }
        saveOrUpdate(dz).then((newDz)=>{
          this.data.deliveryZones.forEach((dz,i)=>{
            if (dz.id === newDz.id || dz.id === -1){
              if (newDz.polygon && newDz.polygon.length){
                newDz.polygon = newDz.polygon.split(",");
              }
              angular.extend(this.data.deliveryZones[i], newDz);
            }
          })
          this.Spinner.hide("delivery-zones-save");
          this.Snack.show(this.LabelService.SNACK_DELIVERY_ZONES_SUCCESS)
          resolve(dz);
          this.editableDeliveryZone = false;
          // }
        })
        // this.data.deliveryZones.push(dz);
      // },500)
    })
  }

  setEditableDeliveryZone(dz){
    console.log("set editable",dz);
    this.editableDeliveryZone=dz;
    this.originalModel = angular.copy(dz);
  }

  prepareZones(){
    this.data.deliveryZones.forEach((dz,i)=>{
      if (dz.polygon && dz.polygon instanceof String){
        dz.polygon = dz.polygon && dz.polygon.length ? dz.polygon.split(",") : dz.polygon;
      }
      dz.$color = this.colors[i];
    })
  }

  getDeliveryZones(){

    return this.$q((resolve,reject)=>{
      Preoday.DeliveryZone.getByVenueId(this.VenueService.currentVenue.id)
        .then((dz)=>{
          this.data = {
            deliveryZones:dz
          };
          this.prepareZones();
          resolve(this.data);
      }, reject)
        .catch((err)=>{
          console.error(err)
          reject();
        })
      // this.data = {
      //   deliveryZones:[ {id:1, type:'DISTANCE', visible:1, name:'dz1', fee:{amount:1}, distance:7},
      //   {id:2, name:'dz2', visible:0, type:'CUSTOM', fee:{}, polygon:["55.95485", "-3.18629", "55.95057", "-3.19492", "55.94776", "-3.18651", "55.95134", "-3.17973"]}]
      // }
    })
  }

  updateDeliveryZone(dz){
    return this.$q((resolve,reject)=>{
      setTimeout(()=>{
        resolve(dz);
      },500)
    });
  }

  cancelEditing(){
    if (this.originalModel){
      this.data.deliveryZones.forEach((dz,i)=>{
        if (dz.id === this.originalModel.id){
          this.data.deliveryZones[i]= this.originalModel;
        }
      })
      this.originalModel = false;
    } else {
      this.data.deliveryZones = this.data.deliveryZones.filter((dz,i)=>dz.id!==-1)
      this.originalModel = false;
    }
    this.editableDeliveryZone=false;
  }

  showCreateDeliveryZone(){
    var index = this.data.deliveryZones.length
    this.editableDeliveryZone= new Preoday.DeliveryZone({
      name:this.gettextCatalog.getString("Delivery Zone ") + (index+1),
      id:-1,
      distance:2,
      visible:1,
      venueId:this.VenueService.currentVenue.id,
      type:'DISTANCE',
      leadTime:0,
      fee:{
        name:this.gettextCatalog.getString("Delivery fee"),
        type:'FIXED',
        orderType:'DELIVERY',
        amount:0
      },
      $color:this.colors[index]
    })
    this.contextual.showDrawer('deliveryZonesEdit');
    this.data.deliveryZones.push(this.editableDeliveryZone);
  }

  delete(dz){
    //TODO return dz.delete().then(()=>{this.data.deliveryZones = this.data.deliveryZones.filter((i)=>i.id!=dz.id); this.prepareZones();});
     return dz.remove().then(()=>{
        this.data.deliveryZones = this.data.deliveryZones.filter((i)=>i.id!=dz.id)
        this.prepareZones();
     })

      // setTimeout(()=>{
        // this.data.deliveryZones = this.data.deliveryZones.filter((i)=>i.id!=dz.id)
        // this.prepareZones();
        // resolve();
      // },500)
    // })
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
    this.data = {
      deliveryZones:[]
    }
    this.colors =[ {border:'#FFAB00', center:'rgba(255, 171, 0, 0.15)'},{border:"#F8A787", center:'rgba(248, 167, 135, 0.15)'},{border:"#C0ADD4", center:'rgba(193, 173, 212, 0.15)'},{border:"#9DD7D0", center:'rgba(157, 215, 208, 0.15)'},{border:"#98C6FE", center:'rgba(152, 198, 254, 0.15)'}];
    this.cancelEditing();
  }
}
