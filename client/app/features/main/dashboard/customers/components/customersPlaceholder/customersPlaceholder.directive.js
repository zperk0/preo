
export default function customersPlaceholder(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {

    },
    template: require("./customersPlaceholder.tpl.html"),
    replace:true,
    link: (scope, el, attr) => {

    }
  }
}
