import controller from './promotionsList.controller'

export default function promotionsList(){
  return {
    restrict: 'E',
    scope: {
      promotions:"=",
      onCreate: '&?',
      onEdit: '&?',
      onAfterDelete: '&?'
    },
    template: require("./promotionsList.tpl.html"),
    controller: controller.UID,
    controllerAs: "promotionsListCtrl",
    bindToController: true,
    link: (scope, el, attr, ctrl) => {

    }
  }
}
