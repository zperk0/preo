// import controller from './barChart.controller'

export default function cardOverlay() {
  'ngInject';
  return {
    restrict: 'E',
    scope: {
      content: "@"
    },
    template: require("./cardOverlay.tpl.html"),
    replace: true,
    link: (scope, elem, attr, ctrl) => {

    }
  }
}