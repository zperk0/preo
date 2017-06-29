
export default function marketingFilter(){
  "ngInject";

  return function(rows, field, shouldFilter) {
    
    if(!shouldFilter)
      return rows;

    var filtered = [];
    
    filtered = rows.filter((row) => {
      let returnRow = false;
      row.forEach((col) => {
        if(col.key == field && col.value == shouldFilter)
          returnRow = true;
      });

      if(returnRow)
        return row;
    });

    return filtered;  
  };
}