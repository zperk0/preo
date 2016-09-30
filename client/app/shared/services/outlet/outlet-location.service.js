export default class OutletLocationService {

  static get UID(){
    return "OutletLocationService";
  }

  save(newData) {

    return Preoday.OutletLocation.save(newData);
  }  

  getOutletLocations(data){

    if (this.data.rootGroup && this.data.rootGroup.outletLocations){
      return this.$q.resolve(this.data);
    } else if ( this.p){
      return this.p;
    }

    if (!data) {
      data = {};
    }

    data.outlets = false;

    this.p = this.$q((resolve, reject)=>{
      Preoday.OutletLocation.getAll(data)
        .then((outletLocations)=>{

          this.buildRootGroup();
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

  setOutletLocationToMove (outletLocation) {

    this.outletLocationToMove = outletLocation;
  }

  getOutletLocationToMove () {

    return this.outletLocationToMove;
  }

  getRootGroup() {

    if (this.data.rootGroup) {
      return this.data.rootGroup;
    }

    this.data.rootGroup = Preoday.OutletLocationGroup.createGroupByOutletLocation({
      id: null,
      venueId: this.venueId
    });

    return this.data.rootGroup;
  }

  buildRootGroup () {

    this.data.rootGroup = Preoday.OutletLocationGroup.createGroupByOutletLocation({
      id: null,
      venueId: this.VenueService.currentVenue.id
    });      
  }

  resetGroups () {

    this.data.rootGroup = null;
    Preoday.OutletLocationGroup.resetGroups();
    Preoday.OutletLocation.resetOutlets();
  }

  findById (id) {

    return Preoday.OutletLocation.getOutletLocationById(id);
  }

  constructor($q, $rootScope, $stateParams, VenueService) {
    "ngInject";
    this.$stateParams = $stateParams;
    this.VenueService = VenueService;
    this.$q =$q;
    this.data={
      rootGroup: null
    };
    this.outletLocationToMove = {};
  }
}