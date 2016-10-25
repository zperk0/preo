
export default class eventListViewController {
  static get UID(){
    return "eventListViewController"
  }

  hideSpinner() {

    this.Spinner.hide('events');
  }

  getEventByDate (date) {

    let dateFormat = moment(date).format('DD/MM/YYYY');

    let events = this.expandedSchedules[dateFormat] || [];

    return events;
  }

  getDayEventsName (date) {

    let events = this.getEventByDate(date);

    let eventsName = events.map((event) => {

      return '<span>' + event.name + '</span><br />';
    }).join('');

    let html = eventsName;

    if (events.length > 1) {
      html = [
                '<div>',
                events.length + ' ' + this.gettextCatalog.getString('events'),
                // '<md-tooltip>' + eventsName + '</md-tooltip>',
                '</div>'
              ].join('');
    }

    return html;
  }

  setDayContent (date) {

    let eventsName = this.getDayEventsName(date);

    if (eventsName) {
      eventsName = this.$compile(eventsName)(this.$scope);
      // console.log(eventsName[0].innerHTML);
      eventsName = this.$sce.trustAsHtml(eventsName[0].innerHTML);
      // console.log(eventsName);
    }

    this.MaterialCalendarData.data[this.MaterialCalendarData.getDayKey(date)] = eventsName || "";
  }

  toggleMode () {

    this.Spinner.show('events');

    if (!this.isCalendarMode()) {
      this.expandSchedules();
    } else {
      this.expandedSchedules = {};
    }


    this.$timeout(() => {

      this.calendarMode = !this.calendarMode;

      this.Spinner.hide('events');
    }, 500);
  }

  isCalendarMode () {

    return this.calendarMode;
  }

  addExpandedScheduleItem(dates, event) {

    for (var i = dates.length - 1; i >= 0; i--) {
      let date = dates[i];

      let dateFormat = moment(date).format('DD/MM/YYYY');
      if (!this.expandedSchedules[dateFormat]) {
        this.expandedSchedules[dateFormat] = [];
      }

      if (this.expandedSchedules[dateFormat].indexOf(event) === -1) {
        this.expandedSchedules[dateFormat].push(event);
      }
    }
  }

  expandSchedules () {

    for (var i = 0, len = this.data.events.length; i < len; i++) {
      let event =  this.data.events[i];

      for (var k = 0, kLen = event.schedules.length; k < kLen; k++) {
        let schedule = event.schedules[k];

        let dates = this.EventScheduleService.expandSchedule(schedule);
        this.addExpandedScheduleItem(dates, event);
      }
    }
  }

  /* @ngInject */
  constructor($scope, $q, $sce, $timeout, $compile, Spinner, EventService, VenueService, OutletLocationService, gettextCatalog, MaterialCalendarData, EventScheduleService) {
  	'ngInject';

    this.$scope = $scope;
    this.$sce = $sce;
    this.$timeout = $timeout;
    this.$compile = $compile;
    this.Spinner = Spinner;
    this.gettextCatalog = gettextCatalog;
    this.MaterialCalendarData = MaterialCalendarData;
    this.EventScheduleService = EventScheduleService;

  	this.loaded = false;
    this.calendarMode = false;
    this.expandedSchedules = {};

    this.Spinner.show('events');

    this.calendar = {
      selectedDate: null,
      firstDayOfWeek: 0,
      dayFormat: 'd',
      tooltips: false
    };

    MaterialCalendarData.setDayContent = this.setDayContent.bind(this);

    let filter = {
      'after' : moment().subtract(7, 'days').format('YYYY/M/D')
    };

    $q.all([
        EventService.getEvents(VenueService.currentVenue.id, filter),
        OutletLocationService.getOutletLocations()
      ]).then((results) => {

        this.data = results[0];

        this.loaded = true;
        this.hideSpinner();
      }, (err) => {

        this.data = {
          events: []
        };
        console.log('error events service', err);
        this.loaded = true;

        this.hideSpinner();
      });
  }
}
