
export default function cardItemNew(gettextCatalog, FeatureService){
  'ngInject';
  return {
    restrict: 'E',
    scope:{
      tooltip:"@",
      onClick:"&"
    },
    template: require("./cardItemNew.tpl.html"),
    link: (scope, el, attr, ctrl) => {
    }
  }
}
