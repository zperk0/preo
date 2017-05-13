
export default function datelocale(){
  "ngInject";

  return function(number, typeOfFormat) {

    if(!moment(number).isValid()) 
      return;

    var momentString = null;
    
    if(typeOfFormat == 'timeOfDay')
      momentString = moment(number).format('LT');
    else if(typeOfFormat == 'dayOfWeek')
      momentString = moment(number).format('dddd');
    else     
      momentString = moment(number).format('L');
 
    return momentString;
  };
}
