export default class EventScheduleService {

  static get UID() {

    return "EventScheduleService";
  }

  save (data) {

    return Preoday.EventSchedule.create(data);
  }

  constructor($q) {
    "ngInject";

    this.$q = $q;
    this.data = {};
  }
}