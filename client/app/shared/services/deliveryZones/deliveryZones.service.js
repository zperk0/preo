'use strict';

export default class DeliveryZoneService {

  static get UID(){
    return "DeliveryZoneService";
  }

  saveEditableDeliveryZone() {
    function _handleError() {
      console.log('[saveEditableDeliveryZone] error', err);
      this.Spinner.hide('delivery-zones-save');
      this.Snack.showError(this.LabelService.SNACK_DELIVERY_ZONES_ERROR);
    }

    return this.$q((resolve, reject) => {

      if (this.editableDeliveryZone.type === 'CUSTOM'){
        if (!this.editableDeliveryZone.polygon || (this.editableDeliveryZone.polygon && this.editableDeliveryZone.polygon.length ===0)){
          this.Snack.showError(this.LabelService.SNACK_DELIVERY_ZONES_SHAPE_ERROR)
          reject();
          return;
        }
      }

       this.Spinner.show("delivery-zones-save");
      //TODO save delivery zone
      // setTimeout(()=>{
        var dz  = angular.copy(this.editableDeliveryZone);
        if (dz.polygon){
          dz.polygon = dz.polygon.toString();
        }
        if (dz.distance){
          dz.distance *= this.distanceMultiplier
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
             if (newDz.distance){
                newDz.distance /= this.distanceMultiplier
              }
              angular.extend(this.data.deliveryZones[i], newDz);
            }
          })
          this.Spinner.hide("delivery-zones-save");
          this.Snack.show(this.LabelService.SNACK_DELIVERY_ZONES_SUCCESS)
          resolve(dz);
          this.editableDeliveryZone = false;
          // }
        }, ()=>{
          this.Spinner.hide("delivery-zones-save");
          this.Snack.showError(this.LabelService.SNACK_DELIVERY_ZONES_ERROR)
        }).catch(()=>{
          this.Spinner.hide("delivery-zones-save");
          this.Snack.showError(this.LabelService.SNACK_DELIVERY_ZONES_ERROR)
        })
        // this.data.deliveryZones.push(dz);
      // },500)
    })
  }

  setEditableDeliveryZone(dz){

    this.editableDeliveryZone=dz;
    this.data.deliveryZones.forEach((dzz,i)=>{
      if (dzz.id === dz.id){
        dzz.$editable = true;
      }
    });
    console.log("set editable", dz.$editable);
    this.originalModel = angular.copy(dz);
    dz.$editable = true;
  }

  prepareZones(){
    this.data.deliveryZones.forEach((dz,i)=>{
      if (dz.polygon && typeof dz.polygon === "string"){
        dz.polygon = dz.polygon && dz.polygon.length ? dz.polygon.split(",") : dz.polygon;
      }
      if (dz.distance){
        dz.distance /= this.distanceMultiplier
      }
      dz.$color = this.colors[i];
    })
  }

  getDeliveryZones(){

    return this.$q((resolve,reject)=>{
      Preoday.DeliveryZone.getByVenueId(this.StateService.venue.id)
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
  cancelEditing(){
    if (this.originalModel){
      this.originalModel.$editable = false; //trigger watch
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
    if (this.editableDeliveryZone && this.editableDeliveryZone.$editable) {
      this.editableDeliveryZone.$editable = false; //trigger watch
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
      $editable:true,
      venueId:this.StateService.venue.id,
      type:'DISTANCE',

      fee:{
        name:this.gettextCatalog.getString("Delivery fee"),
        type:'FIXED',
        orderType:'DELIVERY',
        description:'',
      },
      $color:this.colors[index]
    });

    this.data.deliveryZones.push(this.editableDeliveryZone);
  }

  delete(dz){
    //TODO return dz.delete().then(()=>{this.data.deliveryZones = this.data.deliveryZones.filter((i)=>i.id!=dz.id); this.prepareZones();});
    console.log('SERVIC DELETE - ', dz);
     return dz.remove().then(()=>{
        this.data.deliveryZones = this.data.deliveryZones.filter((i)=>i.id!=dz.id)
        console.log('ZONES AFTER DELETE - ', this.data.deliveryZones);
        this.prepareZones();
     })

      // setTimeout(()=>{
        // this.data.deliveryZones = this.data.deliveryZones.filter((i)=>i.id!=dz.id)
        // this.prepareZones();
        // resolve();
      // },500)
    // })
  }

  getMaxDeliveryZones() {
    return this.colors.length;
  }

  constructor($q, VenueService, StateService, Spinner, Snack, LabelService, gettextCatalog, contextual) {
    "ngInject";
    this.$q = $q;
    this.StateService = StateService;
    var milesOrKms = VenueService.getKmOrMiles(StateService.venue);
    this.distanceMultiplier =  milesOrKms && milesOrKms=="miles"?  1.6 : 1;
    this.LabelService = LabelService;
    this.contextual = contextual;
    this.gettextCatalog = gettextCatalog;
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.data = {
      deliveryZones:[]
    }
    this.colors =[
      {border:'#FFAB00', center:'rgba(255, 171, 0, 0.15)'},
      {border:"#F8A787", center:'rgba(248, 167, 135, 0.15)'},
      {border:"#C0ADD4", center:'rgba(193, 173, 212, 0.15)'},
      {border:"#9DD7D0", center:'rgba(157, 215, 208, 0.15)'},
      {border:"#98C6FE", center:'rgba(152, 198, 254, 0.15)'},
      {border:'#9098C3', center:'rgba(144, 152, 195, 0.15)'},
      {border:'#E66969', center:'rgba(230, 105, 105, 0.15)'},
      {border:'#54AD20', center:'rgba(84, 173, 32, 0.15)'},
      {border:'#9F7C60', center:'rgba(159, 124, 96, 0.15)'},
      {border:'#FFA1E9', center:'rgba(255, 161, 233, 0.15)'}
      ];
    this.cancelEditing();
  }
}
