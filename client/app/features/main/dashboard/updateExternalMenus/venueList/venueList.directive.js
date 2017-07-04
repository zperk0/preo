import controller from './venueList.controller'

export default function venueList(){
  return {
    restrict: 'E',
    scope: {
      venues:"="
    },
    template: require("./venueList.tpl.html"),
    controller: controller.UID,
    controllerAs: "venueListCtrl",
    bindToController: true,
    link: (scope, el, attr, ctrl) => {

    }
  }
}
