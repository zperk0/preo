export default class eventListController {
  static get UID(){
    return "eventListController"
  }

  showNoSlotsDialog () {

    this.DialogService.show(this.ErrorService.EVENT_NO_SLOTS.title, this.ErrorService.EVENT_NO_SLOTS.message, [{
        name: this.gettextCatalog.getString('Create a slot')
      }], {
        hasCancel: true
      }).then(() => {

        this.$state.go('main.dashboard.events.collectionSlots');
      });
  }

  showCreateEvent(){

    if (!this.CollectionSlotsService.hasSlots()) {
      return this.showNoSlotsDialog();
    }

    let isCreating = this.events.filter(function (item) {

      return item.id === undefined;
    }).length;

    if (isCreating){
      console.log("Not showing event new, already showing")
      return;
    }

    let event = new Preoday.Event({
      venueId: this.VenueService.currentVenue.id,
      visible: 1,
      $images: [],
      schedules: [],
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

        deferred.reject(err);
      });

    return deferred.promise;
  }

  /* @ngInject */
  constructor(VenueService, EventService, CollectionSlotsService, DialogService, ErrorService, gettextCatalog, $q, $state) {
  	'ngInject';

    this.VenueService = VenueService;
    this.EventService = EventService;
    this.CollectionSlotsService = CollectionSlotsService;
    this.DialogService = DialogService;
    this.ErrorService = ErrorService;
    this.gettextCatalog = gettextCatalog;
    this.$q = $q;
    this.$state = $state;
  }
}
