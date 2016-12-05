
export default class notificationsController {
  static get UID(){
    return "notificationsController";
  }

  prepareMessages(){
    var maxLen = 3;
    for (let i=0;i<this.messages.length;i++){
      let msg  = this.messages[i];
      if (msg.type === 'ORDER_NOTIFY'){
        if (this.statusMessages.length < maxLen){
          this.statusMessages.push(msg)
        }
      } else {
        if (msg.type === 'ORDER_REJECT'){
          if (this.rejectMessages.length < maxLen){
            this.rejectMessages.push(msg)
          }
        }
      }
      if (this.rejectMessages.legnth >= maxLen && this.statusMessages.length >= maxLen){
        return;
      }
    }
    while (this.rejectMessages.length < maxLen){
      this.rejectMessages.push(new Preoday.Message({
        venueId:this.venue.id,
        orderType: 'ORDER_REJECT',
        type: 'ORDER_REJECT',
        name:'',
        content:'',
        active:1
      }))
    }
    while (this.statusMessages.length < maxLen){
      this.statusMessages.push(new Preoday.Message({
        venueId:this.venue.id,
        orderType: 'ORDER_NOTIFY',
        type: 'ORDER_NOTIFY',
        name:'',
        content:'',
        active:1
      }))
    }
  }

  init(){
    this.Spinner.show("fetch-notifications");
    Preoday.Message.getByVenueId(this.venue.id)
      .then((messages)=>{
        messages.sort((a,b)=>a.id-b.id)
        this.messages = messages;
        this.prepareMessages();
        this.Spinner.hide("fetch-notifications");
      }, (err)=>{
        this.Spinner.hide("fetch-notifications");
        console.log("error", err)
        this.isError = true;
      }) .catch((err)=>{
        this.Spinner.hide("fetch-notifications");
        console.log("error", err)
        this.isError = true;
      })
  }

  /* @ngInject */
  constructor(Spinner, Snack, ErrorService, LabelService, VenueService,  $timeout) {
    "ngInject";
    this.Spinner = Spinner;
    this.Snack = Snack;
    this.ErrorService = ErrorService;
    this.LabelService = LabelService;
    this.venue = VenueService.currentVenue;
    this.isError = false;
    this.$timeout = $timeout;
    this.statusMessages = [];
    this.rejectMessages = [];
    this.init();

  }
}
