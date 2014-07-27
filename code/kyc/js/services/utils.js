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

  var dynamicSort = function (property, desc) {
      var sortOrder = 1;
      if ( desc ) {
          sortOrder = -1;
      }

      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
      
  }

  var dynamicSortObject = function (obj, property, desc) {

    var sortOrder = 1;
    if ( desc ) {
        sortOrder = -1;
    }

    var index = [];

    angular.forEach(obj, function( item ) {
      index.push(item);
    })

    
    // sort the index
    index.sort(function (a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    });
    return index;
  }
		
  return {
    sliceObject: sliceObject,
    reOrderWidgets: reOrderWidgets,
    dynamicSort: dynamicSort,
  	dynamicSortObject: dynamicSortObject,

  }

}]);