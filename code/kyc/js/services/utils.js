angular.module('kyc.services')
.service('UtilsService',['$timeout', function($timeout) {

  var items = [];


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

  var setItems = function( itemsData ) {
    items = itemsData;
  };

  var getItems = function(){
    return items;
  }

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

      $timeout(function() {
        angular.element('#sscontainer').trigger("ss-rearrange");
      });
  }

  var dynamicSort = function (property, desc) {
      var sortOrder = 1;
      if ( desc ) {
          sortOrder = -1;
      }

      return function( a, b ) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
      }

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
  };

  /**
  * Merge 2 arrays of objects and remove item repeat
  */

  var mergeArraysUnique = function( newArray, oldArray ) {

    var arrOldIds = oldArray.map(function( x ) {
      return x.id;
    });

    for (var i = newArray.length - 1; i >= 0; i--) {
      var a = newArray[i];

      var index = arrOldIds.indexOf( a.id );

      if ( index !== -1 ) {
        oldArray.splice(index, 1);
        arrOldIds.splice(index, 1);
      }
    };

    return newArray.concat( oldArray );

  }

  return {
    sliceObject: sliceObject,
    reOrderWidgets: reOrderWidgets,
    dynamicSort: dynamicSort,
    dynamicSortObject: dynamicSortObject,
  	mergeArraysUnique: mergeArraysUnique,
    setItems: setItems,
    getItems: getItems

  }

}]);