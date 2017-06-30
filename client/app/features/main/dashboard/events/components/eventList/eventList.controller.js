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

  onMenuOptionClick($event, type){
    if(type === 'NEW')
      return this.showCreateEvent();
    else if(type === 'IMPORT'){

      this.ExternalService.cleanEntityEvent();

      this.contextual.showDrawer('eventsImport')
        .then((eventsImported) => {

          this.Snack.show(this.gettextCatalog.getString("Events imported successfully."));

          this.events = this.events.concat(eventsImported);

        }, () => {

          console.log('Drawer Event Import cancelled');
        })
      .catch((err) => {
        console.log('Error importing events -', err);
        this.Snack.showError(this.gettextCatalog.getString("An error occurred while importing events. Please try again."));
      });

    }
  }

  showMenuOptions($event, $mdOpenMenu){


    if(!this.hasTMFeature){
      return this.showCreateEvent();
    }
    else{

      let options = [
        {
          name: gettextCatalog.getString('Create new event'),
          type: 'NEW'
        },
        {
          name: gettextCatalog.getString('Import Ticket Master event'),
          type: 'IMPORT'
        }
      ];

      this.menuOptions = options;

      $mdOpenMenu();
    }
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

  showSpinner(){
    this.Spinner.show('eventList-spinner');
  }

  hideSpinner(){
    this.Spinner.hide('eventList-spinner');
  }

  /* @ngInject */
  constructor(VenueService, $timeout, EventService, Spinner, ExternalService, CollectionSlotsService, Snack, contextual, DialogService, ErrorService, FeatureService, gettextCatalog, $q, $state) {
  	'ngInject';
    this.contextual = contextual;
    this.Snack = Snack;
    this.Spinner = Spinner;
    this.VenueService = VenueService;
    this.EventService = EventService;
    this.CollectionSlotsService = CollectionSlotsService;
    this.DialogService = DialogService;
    this.ErrorService = ErrorService;
    this.gettextCatalog = gettextCatalog;
    this.$q = $q;
    this.$state = $state;
    this.$timeout = $timeout;

    this.ExternalService= ExternalService;

    this.hasTMFeature = FeatureService.hasTicketMasterEventFeature();
  }
}
