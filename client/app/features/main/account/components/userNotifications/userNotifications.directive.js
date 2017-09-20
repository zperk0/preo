import controller from './userNotifications.controller'

export default function userNotifications(){
  return {
    restrict: 'EA',
    template: require("./userNotifications.tpl.html"),
    replace: true,
    controller: controller.UID,
    controllerAs: "userNotificationsCtrl",
    bindToController: true
  }
}
