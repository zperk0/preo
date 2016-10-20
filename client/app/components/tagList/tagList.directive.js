import controller from './tagList.controller'

export default function tagList($timeout){
  'ngInject';
  return {
    restrict: 'E',
    scope: {

    },
    template: require("./tagList.tpl.html"),
    controller: controller.UID,
    controllerAs: "tagListCtrl",
    bindToController: true,
    require:['ngModel','tagList'],
    replace:true,
    link: (scope, el, attr, ctrl) => {
      ctrl[1].ngModel = ctrl[0];
      $timeout(()=>{
        ctrl[1].setModels();
      })
    }
  }
}
