
export default function orderObj(){
  "ngInject";

// Filter to OrderBy an array of identical Objects
// Object must contain a 'key' property, that defines it, to be sorted.
// Example: obj: { key: 'name' , data: 'Stuart'} , obj2: {key: 'name', data: 'David'}, obj3: { key: 'sex', data: 'Whatever'}
// Sorting by 'name' -> (arrayObj, 'name', 'data')
  return function(body, property, value) {

    var direction = true;

    if(property.substring(0,1) == '-'){
      direction = false;
      property = property.substr(1);
    }

    var sorted = [];
    angular.forEach(body, function(row) {
      sorted.push(row);
    });

    sorted.sort(function (a, b) {
      var aColumn = a.filter((x) => {
        if(x.key == property)
        return x
      });
      var bColumn = b.filter((x) => {
        if(x.key == property)
        return x
      });

      var valueA = angular.copy(aColumn[0][value]);
      var valueB = angular.copy(bColumn[0][value]);

      if(typeof(valueA) ==='string')
        valueA = valueA.toLowerCase();

      if(typeof(valueB) ==='string')
        valueB = valueB.toLowerCase();

      if(valueA > valueB)
        return 1

      if(valueA < valueB)
        return -1;

      return 0;
    });

    if(!direction)
      sorted.reverse();

    return sorted;
  };
}