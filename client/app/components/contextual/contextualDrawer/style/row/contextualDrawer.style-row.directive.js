import './contextualDrawer.style-row.scss';

export default function contextualMenu($compile){
  "ngInject";
  return {
    restrict: 'E',
    template: require("./contextualDrawer.style-row.tpl.html"),
    scope:{
      entity:"=",
      model:"="
    },
    replace:true,
    transclude:true,
    require:'^contextualDrawerStyle',
    link: (scope, el, attr, ctrl) => {
      scope.toggleAccordion = ctrl.toggleExpanded.bind(ctrl);
      let $template = require("./templates/"+scope.entity.id+".tpl.html");
      let $templateEl = $compile($template)(scope);
      let wrapper = angular.element(el[0].querySelector(".form-style"));
      wrapper.prepend($templateEl);
      console.log("wrapper", wrapper, $templateEl)

    }
  }
}
