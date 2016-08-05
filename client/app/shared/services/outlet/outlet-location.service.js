export default class OutletLocationService {

  static get UID(){
    return "OutletLocationService";
  }

  save(newData) {

    // let deferred = this.$q.defer();

    return Preoday.OutletLocation.save(newData);
      //   .then((outletLocation)=>{
          
      //   deferred.resolve(outletLocation);
      // }, (err) => {

      //   deferred.reject(err);
      // });   

    // return deferred.promise; 
  }  

  getOutletLocations(data){

    if (this.data.outletLocations){
      return this.$q.resolve(this.data);
    } else if ( this.p){
      return this.p;
    }
    this.p = this.$q((resolve, reject)=>{
      Preoday.OutletLocation.getAll(data)
        .then((outletLocations)=>{
          this.data.outletLocations = outletLocations;
          resolve(this.data);
        },(err)=>{
          console.log("Error fetching outletLocations", err);
          reject(err);
        })
        .catch((err)=>{
          console.log("Error fetching outletLocations", err);
          reject(err);
        });
    })
    return this.p;
  }



  constructor($q, $rootScope, $stateParams) {
    "ngInject";
    this.$stateParams = $stateParams;
    this.$q =$q;
    this.data={};
  }
}