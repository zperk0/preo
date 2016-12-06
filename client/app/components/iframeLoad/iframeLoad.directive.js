export default function iframeLoad(){
  "ngInject";

  return {
    restrict: 'A',
    scope: {
      callback: '&iframeLoad'
    },
    link: (scope, element, attrs) => {


      element.on('load', function() {

        scope.callback && scope.callback();
      });
    }
  }
}
