angular.module('delivery.directives',[])
.directive("percent", function($filter){
    var p = function(viewValue){
      console.log('hereho',viewValue);
      var m = viewValue.match(/^(\d+)/);
      if (m !== null){
        console.log("returning:",$filter,$filter('number'),$filter('number')(parseFloat(viewValue)/100))
        return $filter('number')(parseFloat(viewValue)/100);
      }
    };

    var f = function(modelValue){
        console.log("horeHe");
        return $filter('number')(parseFloat(modelValue)*100);
    };

    return {
      require: 'ngModel',
      link: function(scope, ele, attr, ctrl){
          ctrl.$parsers.unshift(p);
          ctrl.$formatters.unshift(f);
      }
    };
});