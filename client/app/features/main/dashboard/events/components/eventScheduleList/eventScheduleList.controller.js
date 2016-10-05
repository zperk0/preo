export default class eventScheduleListController {
  static get UID(){
    return "eventScheduleListController"
  }

  showCreateSchedule() {

    let isCreating = this.schedules.filter(function (item) {

      return item.id === undefined;
    }).length;
    
    if (isCreating){
      console.log("Not showing schedule new, already showing")
      return;
    }

    let schedule = new Preoday.EventSchedule({
      eventId: this.event.id,
      freq: this.EventScheduleFrequency.ONCE,
      pickupSlots: [],

      $selected: true,
      $show: true
    });

    this.schedules.push(schedule);
  }  

  createSchedule (newData) {

    let deferred = this.$q.defer();

    // newData.position = 0;

    this.EventScheduleService.save(newData)
        .then((schedule)=>{

        this.buildScheduleTimestamp(schedule);

        deferred.resolve(schedule);
      }, (err) => {
        
        deferred.reject(err);
      });

    return deferred.promise;    
  }    

  recalculateHeight() {

    this.event.$expanding = true;
    let maxHeight = 0;
    this.schedules.forEach((i)=>{
      maxHeight += 50 + 16;
    });

    // (button + height + margin-top + margin-bottom)
    this.el[0].style.maxHeight = maxHeight + (50 + 8 + 32) + "px";
  }  

  buildScheduleTimestamp(schedule) {

    schedule.$startTimestamp = moment(schedule.startDate).valueOf();
    schedule.$endTimestamp = moment(schedule.endDate).valueOf();    
  }

  /* @ngInject */
  constructor($scope, $timeout, $q, Spinner, Snack, gettextCatalog, EventScheduleFrequency, EventScheduleService) {
    "ngInject";

    this.Spinner = Spinner;
    this.Snack = Snack;
    this.$q = $q;
    this.$timeout = $timeout;
    this.gettextCatalog = gettextCatalog;
    this.EventScheduleFrequency = EventScheduleFrequency;
    this.EventScheduleService = EventScheduleService;

    this.event.$expanding = false;

    this.schedules.forEach((schedule)=> {

      schedule.$show = false; 
      this.buildScheduleTimestamp(schedule);
    });

    //watch for animation only if we're in a section
    if (this.event && this.event.id){
      // 

      $scope.$watch('eventScheduleListCtrl.event.$expanded',(newVal, oldVal)=>{
        if(newVal){ // if expanded = true;
          this.schedules.forEach((i)=>i.$show = true)
          if (this.schedules.length === 0){
            this.recalculateHeight();
          }
        } else if (oldVal){ //if expanded = false and it was true
          this.el[0].style.maxHeight = 0;
          this.event.$expanding = true;
          $timeout(()=>{
            this.schedules.forEach((i)=>i.$show = false)
            this.event.$expanding = false;
          }, 1000)

        }
      })
    }    
  }
}
