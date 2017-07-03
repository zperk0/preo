import './venueDetailsForm.scss';

export default function venueDetailsForm($compile){
  "ngInject";
  return {
    restrict: 'E',
    template: require("./venueDetailsForm.tpl.html"),
    replace:true,
    link: (scope, el, attr, ctrls) => {

    }
  }
}
