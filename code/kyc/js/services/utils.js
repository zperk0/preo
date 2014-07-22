angular.module('kyc.services')
.service('UtilsService',[function() {

    
  var sliceObject = function( object, begin, end ) {

    var i = 0;
    var data = {};

    var keys = Object.keys(object);

    if ( keys.length < end ) {
      end = keys.length;
    }

    for ( var i = begin; i < end; i++) {
      var key = keys[i];
      data[key] = object[key];
    }

    return data;
  };

  var reOrderWidgets = function( element ){
      var $charts = $(element).children().find('.flip-container');
      var objectValues = {};

      for (var i = $charts.length - 1; i >= 0; i--) {
          var $chart = $($charts[i]);

          var index = $charts.index( $chart )
          var scope = $chart.scope();

          objectValues[scope.value.num] = {
              order: index,
              display: scope.value.display
          };
          scope.value.order = index;
      };

      window.sessionStorage.setItem('widgets', angular.toJson(objectValues));    
  }
		
  return {
    sliceObject: sliceObject,
  	reOrderWidgets: reOrderWidgets,

  }

}]);