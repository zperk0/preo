
export default function cardItemNew(){
  'ngInject';
  return {
    restrict: 'E',
    scope:{
      onClick:"&"
    },
    template: require("./cardItemNew.tpl.html"),
    link: (scope, el, attr, ctrl) => {
    }
  }
}
