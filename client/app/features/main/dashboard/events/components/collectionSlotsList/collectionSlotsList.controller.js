export default class collectionSlotsListController {
  static get UID(){
    return "collectionSlotsListController"
  }

  showCreateCollectionSlot(){

    let isCreating = this.collectionSlots.filter(function (item) {

      return item.id === undefined;
    }).length;

    if (isCreating){
      console.log("Not showing collection slot new, already showing")
      return;
    }

    let slot = new Preoday.PickupSlot({
      venueId: this.VenueService.currentVenue.id,
      $selected: true,
    });

    this.collectionSlots.push(slot);
  }

  createCollectionSlot (newData) {

    let deferred = this.$q.defer();

    newData.position = 0;

    this.CollectionSlotsService.save(newData)
        .then((slot)=>{

        deferred.resolve(slot);
      }, (err) => {
        console.log('fail collection slot saved', err);
        deferred.reject(err);
      });

    return deferred.promise;
  }

  /* @ngInject */
  constructor($q, VenueService, CollectionSlotsService) {
  	'ngInject';

  	this.$q = $q;
    this.VenueService = VenueService;
    this.CollectionSlotsService = CollectionSlotsService;
  }
}
