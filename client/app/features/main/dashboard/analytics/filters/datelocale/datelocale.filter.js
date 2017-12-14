
export default function datelocale(){
  "ngInject";

  return function(number, typeOfFormat) {

    if (!moment(number).isValid()) {
      return null;
    }

    let formatted = null;

    if (typeOfFormat === 'dateMin') {
      formatted = moment(number).format('DD MMM YY');
    } else if (typeOfFormat == 'timeOfDay') {
      formatted = moment(number).format('LT');
    } else if(typeOfFormat == 'dayOfWeek') {
      formatted = moment(number).format('dddd');
    } else {
      formatted = moment(number).format('L');
    }

    return formatted;
  };
}
