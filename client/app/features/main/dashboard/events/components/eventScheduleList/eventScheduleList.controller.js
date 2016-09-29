export default class eventScheduleListController {
  static get UID(){
    return "eventScheduleListController"
  }

  showCreateSchedule(){

    let isCreating = this.schedules.filter(function (item) {

      return item.id === undefined;
    }).length;
    
    if (isCreating){
      console.log("Not showing schedule new, already showing")
      return;
    }

    let schedule = new Preoday.EventSchedule({
      eventId: this.event.id,
      $selected: true,
    });

    this.schedules.push(schedule);
  }  

  recalculateHeight() {

    this.event.$expanding = true;
    let maxHeight = 0;
    this.schedules.forEach((i)=>{
     maxHeight += 50 + 16;
    })
    console.log('recalculating height... ', maxHeight);

    // (button + height + margin-top + margin-bottom)
    this.el[0].style.maxHeight = maxHeight + (50 + 8 + 32) + "px";
  }  

  /* @ngInject */
  constructor($scope, $timeout, $q, Spinner, Snack, gettextCatalog) {
    "ngInject";

    // console.log('schedules here');

    this.Spinner = Spinner;
    this.Snack = Snack;
    this.$q = $q;
    this.$timeout = $timeout;
    this.gettextCatalog = gettextCatalog;

    this.event.$expanding = false;

    this.schedules.forEach((i)=>i.$show = false)

    //watch for animation only if we're in a section
    if (this.event && this.event.id){
      // 

      $scope.$watch('eventScheduleListCtrl.event.$expanded',(newVal, oldVal)=>{

        // console.log('watcher herre', newVal, oldVal);

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
