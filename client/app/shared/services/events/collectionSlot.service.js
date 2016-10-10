export default class CollectionSlotsService {

  static get UID() {

    return "CollectionSlotsService";
  }

  getCollectionSlots(data) {

    if (this.data.collectionSlots){
      return this.$q.resolve(this.data);
    } else if ( this.p){
      return this.p;
    }

    this.p = this.$q((resolve, reject)=>{

      Preoday.PickupSlot.getAll(data)
        .then((collectionSlots)=> {

          this.data.collectionSlots = collectionSlots;
          resolve(this.data);
        },(err)=>{

          console.log("Error fetching collectionSlots", err);
          reject(err);
        })
        .catch((err)=>{
          
          console.log("Error fetching collectionSlots", err);
          reject(err);
        });
    })
    return this.p;
  }

  findById (id) {

    let item = this.data.collectionSlots.filter(function (o) {
      return o.id === id;
    });

    return item && item.length ? item[0] : null;
  }

  save (data) {

    return Preoday.PickupSlot.create(data);
  }

  hasBasicTabErrors (contextualForm, entity) {

    return  contextualForm
            && contextualForm.$submitted
            && 
            (
              contextualForm.entityName.$invalid
              || contextualForm.entityDisplayName.$invalid
              || contextualForm.entityEnd.$invalid
              || contextualForm.entityLeadTime.$invalid
            );
  }

  hasAdvancedTabErrors (contextualForm, entity) {

    return  contextualForm
            && contextualForm.$submitted
            && 
            (
              contextualForm.entityStart.$invalid
              || (entity.$hasSteps && contextualForm.entityStep.$invalid)
            );
  }

  constructor($q, $rootScope, $stateParams) {
    "ngInject";

    this.$stateParams = $stateParams;
    this.$q = $q;
    this.data = {};
  }
}