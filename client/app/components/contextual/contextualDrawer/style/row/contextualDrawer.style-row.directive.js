import './contextualDrawer.style-row.scss';

export default function contextualMenu($compile, $timeout){
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
    require:['?^contextualDrawerStyle', '?^contextualDrawerStyleEmails', '?^contextualDrawerStyleMobile'],
    link: (scope, el, attr, ctrls) => {
      var ctrl = ctrls[0] || ctrls[1] || ctrls[2];
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
        console.log("recalc height -> ", newVal, oldVal)
        recalcHeight(newVal,oldVal);
      })

      scope.onChange = (key, imageModel)=>{
        ctrl.onImageUpload(key, imageModel)
      }

      scope.onDelete = (key, imageModel)=>{
        if (ctrl.onImageDelete){
          ctrl.onImageDelete(key, imageModel)
        }
      }
    }
  }
}
