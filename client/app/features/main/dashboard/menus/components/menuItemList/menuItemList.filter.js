export default function menuItemList($location){
  "ngInject";

 return function(items, property, reverse) {

    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });

    if (property !== '$index') {
        filtered.sort(function (a, b) {    

            if (!property) {
                property = 'position';
            }

            return a[property] > b[property];
        });
    }

    return filtered;
 };
}