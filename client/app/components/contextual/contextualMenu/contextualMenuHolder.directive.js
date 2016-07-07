import controller from './contextualMenu.controller'

export default function contextualMenuHolder(){
  "ngInject";
  return {
    restrict: 'A',
    link: (scope, el, attr, ctrl) => {
      el.addClass("contextual-menu-holder");
    }
  }
}
