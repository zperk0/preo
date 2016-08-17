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

      function recalcHeight(newVal, oldVal){
        if (newVal && !oldVal){
          if(scope.radioChoice){
            wrapper.css('height',scope.entity.height[scope.radioChoice]);
          } else {
            wrapper.css('height',scope.entity.height);
          }
        } else if (!newVal && oldVal){
          wrapper.css('height','0px');
        }
      }


      scope.$watch('radioChoice',(newVal, oldVal)=>{
        if (scope.entity.expanded){
          recalcHeight(true,false);
        }
      });

      scope.$watch('entity.expanded',(newVal, oldVal)=>{
        console.log("recalc height")
        recalcHeight(newVal,oldVal);
      })

      scope.onChange = (key, imageModel)=>{
        ctrl.onImageUpload(key, imageModel)
      }
    }
  }
}
