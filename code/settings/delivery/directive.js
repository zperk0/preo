angular.module('delivery.directives',[])
.directive("percent", function($filter){
    var p = function(viewValue){      
      var m = viewValue.match(/^(\d+)/);
      if (m !== null){        
        return $filter('number')(parseFloat(viewValue)/100);
      }
    };
    var f = function(modelValue){
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