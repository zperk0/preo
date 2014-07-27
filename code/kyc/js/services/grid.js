angular.module('kyc.services').
  service('$grid', ['ChartType', function( ChartType ) {

  	var populateItems = function( charts ) {
  	  var values = [];
      var i = 1;
      var grid = 8;
      var col = 1;
      var row = 1;

      var $widgets = window.sessionStorage.getItem('widgets');

      if ( $widgets ) {
        $widgets = angular.fromJson($widgets);
      }      

      angular.forEach(charts, function(value, key) {        
      	var data = {};

      	data.display = true;
      	data.title = value.title;
      	data.num = i;

      	if ( value.type === ChartType.NUMBER ) {
      		data.showChart = false;
      		data.size_x = 2;
      		data.size_y = 1;
      		data.value = value.data;
          data.currency = value.currency;
      	} else {
      		data.showChart = true;
			    data.size_x = 4;
      		data.size_y = 2;
      		data.value = value;
          data.currency = value.currency;
      	}
        
        if ( $widgets ) {
          data.order = $widgets[ i ].order;
          data.display = $widgets[ i ].display;
        }

      	data.row = row;
      	data.col = col;

      	if ( (col + data.size_x) > grid ) {
      		col = 1;
      		++row;
      	} else {
      		col = col + data.size_x;
      	}


      	++i;

      	values.push( data );

      });

      if ( $widgets ) {
        values.sort(function compare(a,b) {
          if (a.order < b.order)
             return -1;
          if (a.order > b.order)
            return 1;
          return 0;
        });
      }

      return values;
  	};

  	return {
  		populateItems: populateItems
  	};

  }]);