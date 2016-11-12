export default function autoSave(){
  "ngInject";
  return {
    restrict: 'E',
    scope: {
      isSaving:"=",
      isError:"=",
      retry:"&"
    },
    replace:true,
    template: require("./autoSave.tpl.html"),
    link: (scope, el, attr) => {
        scope.pristine = true;

        scope.$watch('isSaving',function(newVal){
          if (newVal){
            scope.pristine = false;
          }
        })
        scope.doRetry = function(){
          if (scope.retry){
            scope.retry();
          }
        }
    }
  }
}
