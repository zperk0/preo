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
		
  return {
  	sliceObject: sliceObject

  }

}]);