
export default function menuSectionNew(){
  "ngInject";
  return {
    restrict: 'E',
    template: require("./menuSectionNew.tpl.html"),
    replace:true,
    scope:{
      ngClick:"&"
    },
    link: (scope, el, attr) => {
    }
  };
}
