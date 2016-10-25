export default class eventController {
  static get UID(){
    return "eventController"
  }

  restoreOriginalValues() {

    if (this.originalEvent){
      delete this.originalEvent.schedules;
      angular.extend(this.event, this.originalEvent);
      this.originalEvent = false;
    }
  }

  toggleExpanded($event){
    if (this.event.$expanding){
      return;
    }
    if ($event){
      var el = angular.element($event.target);
      while (el[0]) {
        el = angular.element(el);
        if (el.hasClass('sv-long-pressing')){
          return;
        }
        el = el.parent();
      }
    }
    this.cardItemList.expandItem(this.event);
    this.contextualMenu.close();
  }

  contextualMenuCancel() {

    this.restoreOriginalValues();
    this.event.$selected = false;

    if (this.event && !this.event.id) {
      this.cardItemList.deleteItem(this.event);
    }
  }

  contextualMenuSuccess(entity){
    if (this.event && entity && entity.name){
      this.event = entity;

      if (!this.event.schedules.length) {
        this.event.$selected = false;
        this.contextualMenu.hide();
        return this.addEventSchedule();
      }

      if (!this.event.id){
        this.createEvent();

      } else {
        this.updateEvent().then(()=>{
          this.contextualMenu.hide();
          this.event.$selected = false;
        });
      }
    }
  }

  createEvent () {

    let deferred = this.$q.defer();

    this.Spinner.show("event-create");
    this.eventListCtrl.createEvent(this.event)
      .then((_event)=>{

        this.event.$deleted = false;
        this.event.$selected = false;

        this.$timeout(() => {

          angular.extend(this.event, _event);

          this.contextualMenu.hide();
          this.Spinner.hide("event-create");
          this.Snack.show(this.gettextCatalog.getString('Event created'));

          deferred.resolve(this.event);
        });
      }, (err)=>{
        console.log('error on save event', err);
        this.Spinner.hide("event-create");
        this.Snack.showError(this.gettextCatalog.getString('Error saving event'));

        deferred.reject(err);
      });

    return deferred.promise;
  }

  updateEvent(){

    this.Spinner.show("event-update");
    return this.$q((resolve, reject)=>{
      this.EventService.update(this.event)
        .then((_event)=>{
          this.Snack.show(this.gettextCatalog.getString('Event updated'));
          resolve(_event);
      },(err) => {
        reject();
        this.Snack.showError(this.gettextCatalog.getString('Error updating event'));
      }).then(()=>{
        this.Spinner.hide("event-update");
      })
    });
  }

  addEventSchedule () {

    if (!this.event.schedules.length) {
      if (!this.event.$expanded) {
        this.event.$expanded = true;
      }

      this.event.schedules.push(this.EventScheduleService.getNewScheduleModel(this.event.id));
    }
  }

  onEdit ($event) {

    this.event.$images = [];

    if (this.event.image) {
      this.event.$images.push({
        image: this.event.image
      });
    }

    this.event.$expanded = false;
    this.originalEvent  = angular.copy(this.event);
    this.cardItemList.selectItem(this.event);
    this.showContextual();
    $event.stopPropagation();
  }

  showOutletLocationWithOutletMessage() {

    this.DialogService.show(this.ErrorService.EVENT_OUTLET_LOCATION.title, this.ErrorService.EVENT_OUTLET_LOCATION.message, [{
        name: this.gettextCatalog.getString('Got it')
      }]);
  }

  onAddOutletLocation () {

    if (!this.OutletLocationService.hasOutletLocations()) {
      return;
    }

    this.cardItemList.selectItem(this.event);

    this.contextual.showDrawer('eventOutletLocations')
      .then((outletLocation) => {

        this.event.$selected = false;

        if (outletLocation.outletId) {
          return this.showOutletLocationWithOutletMessage();
        }

        if (this.event.outletLocationId !== outletLocation.id) {
          this.event.outletLocationId = outletLocation.id;
          this.updateEvent()
            .then(this.buildOutletLocation.bind(this));
        }
        console.log('outletLocation selected', outletLocation);
      }, () => {

        this.event.$selected = false;
        console.log('outletLocation cancelled');
      });
  }

  removeOutletLocation () {

    this.event.outletLocationId = null;
    this.updateEvent()
      .then(this.buildOutletLocation.bind(this));
  }

  onDelete(){

    this.DialogService.delete(this.LabelService.TITLE_DELETE_EVENT, this.LabelService.CONTENT_DELETE_EVENT)
      .then(()=>{
          this.Spinner.show("event-delete");

          this.event.visible = 0;

          let promise = this.event.update();

          promise.then(()=>{

              this.removeEventItem();
              this.Snack.show('Event deleted');
              this.Spinner.hide("event-delete");
          })
          .catch((err)=>{
            this.Spinner.hide("event-delete")

            this.Snack.showError('Event not deleted');
          });
      });
  }

  removeEventItem () {

    this.cardItemList.onItemDeleted(this.event);
    if (this.onItemDeleted){
      this.onItemDeleted({item:this.event});
    }
  }

  buildOutletLocation() {

    this.outletLocations = [];

    if (this.event && this.event.outletLocationId) {

      let outletLocation = this.OutletLocationService.findById(this.event.outletLocationId);

      if (outletLocation) {
        this.outletLocations.push(outletLocation);
      }
    }
  }

  getAddOutletLocationMessage () {

    if (this.OutletLocationService.hasOutletLocations()) {
      return this.gettextCatalog.getString('Set outlet configuration');
    }

    return this.gettextCatalog.getString("You don't have outlet locations yet");
  }

  showContextual () {

    this.contextual.showMenu(this.type, this.event, this.contextualMenuSuccess.bind(this), this.contextualMenuCancel.bind(this), {
        doneButtonText: this.event.schedules.length < 1 ? this.gettextCatalog.getString('Add schedule') : null
      });
  }

  constructor($q, $timeout, Spinner, Snack, contextualMenu, contextual, DialogService, LabelService, ErrorService, EventService, EventScheduleService, gettextCatalog, OutletLocationService) {
  	"ngInject";

    this.$q = $q;
  	this.$timeout = $timeout;
  	this.Spinner = Spinner;
  	this.Snack = Snack;
  	this.contextualMenu = contextualMenu;
  	this.contextual = contextual;
  	this.DialogService = DialogService;
    this.LabelService = LabelService;
  	this.ErrorService = ErrorService;
    this.EventService = EventService;
    this.EventScheduleService = EventScheduleService;
    this.gettextCatalog = gettextCatalog;
  	this.OutletLocationService = OutletLocationService;

  	this.type = 'event';

    this.buildOutletLocation();

    if (this.event && !this.event.id) {
      this.showContextual();
    }
  }
}
