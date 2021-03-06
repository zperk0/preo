import controller from './venueSelect.controller';

export default function venueSelect(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      venueId:"="
    },
    template: require("./venueSelect.tpl.html"),
    controller: controller.UID,
    controllerAs: "$venueSelect",
    bindToController: true,
    replace:true,
    link: (scope, el, attr, ctrl) => {
    }
  };
}
