export default function orderByPosition($sce){
  "ngInject";

  return function(input,sortBy) {
    if (!sortBy || !sortBy.length || !input || !input.length){
      return input;
    }
    var ordered = [];
    sortBy.sort((a,b)=>a.position-b.position)
    for (var i in sortBy) {
      let found = input.filter((inputItem)=>inputItem.id===sortBy[i].id)[0]
      if (found)
        ordered.push(found);
    }

    if (!input[input.length-1].id){
      ordered.push(input[input.length-1]);
    }
    input = ordered;

    return input;
  };
}