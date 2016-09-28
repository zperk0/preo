export default class eventListController {
  static get UID(){
    return "eventListController"
  }

  showCreateEvent(){

    let isCreating = this.events.filter(function (item) {

      return item.id === undefined;
    }).length;
    
    if (isCreating){
      console.log("Not showing event new, already showing")
      return;
    }

    let event = new Preoday.Event({
      venueId: this.VenueService.currentVenue.id,
      $images: [],
      $selected: true,
    });

    this.events.push(event);
  }  

  createEvent (newData) {

    let deferred = this.$q.defer();

    // newData.position = 0;

    this.EventService.save(newData)
        .then((event)=>{
          
        deferred.resolve(event);
      }, (err) => {
        console.log('fail event saved', err);
        deferred.reject(err);
      });

    return deferred.promise;  	
  }  

  /* @ngInject */
  constructor(VenueService, EventService) {
  	'ngInject';
    
    this.VenueService = VenueService;
    this.EventService = EventService;
  }
}
