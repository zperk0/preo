export default class notificationsFormController {
  static get UID(){
    return "notificationsFormController"
  }

  retry(){
    if (this.lastNotification){
      this.saveMessage(this.lastNotification)
    } else {
      this.startSaving();
      this.$timeout(()=>{
        this.finishSaving(false);
      },800)
    }
  }

  saveMessage(notification){

    this.startSaving();
    var saveOrUpdate = notification.id ? notification.update.bind(notification) : Preoday.Message.create;
      saveOrUpdate(notification)
        .then((newNot)=>{
          notification.id = newNot.id;
          this.finishSaving(false);
        },()=>{
          this.lastNotification = notification;
          this.finishSaving(true);
        }).catch(()=>{
          this.lastNotification = notification;
          this.finishSaving(true);
        })
  }

  startSaving(){
    this.$timeout(()=>{
      this.isSaving = true;
      this.isError = false;
    });
  }

  finishSaving(isError){
    this.$timeout(()=>{
      this.isSaving = false;
      this.isError = isError;
    });
  }
  /* @ngInject */
  constructor($timeout) {
    "ngInject";
    this.$timeout = $timeout;
    this.isSaving = false;
    this.isError = false;
  }
}
