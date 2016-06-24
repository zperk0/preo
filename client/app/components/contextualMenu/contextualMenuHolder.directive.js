import controller from './contextualMenu.controller'

export default function contextualMenuHolder(){
  "ngInject";
  return {
    restrict: 'A',
    link: (scope, el, attr, ctrl) => {
      let holders = document.querySelectorAll(".contextual-menu-holder");
      if (holders && holders.length){
        throw "Found duplicate contextual menu holders";
      } else {
        el.addClass("contextual-menu-holder");
      }
    }
  }
}
