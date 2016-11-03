
export default function currency(VenueService){
  "ngInject";

  var accounting = require("accounting");

  return function(number) {
    var thousand, decimal, format;
    var countryCode = VenueService.currentVenue && VenueService.currentVenue.country || 'GB';
    var symbol =  VenueService.currentVenue ? VenueService.currentVenue.ccySymbol || VenueService.currentVenue.ccy : '';

    if (["FR", "DE", "NO", "SE"].indexOf(countryCode) >= 0) {
        thousand = " ";
        decimal = ",";
        format = "%v%s";
        if(countryCode == 'NO') {
          format = "%s %v";
        } else if(countryCode == 'SE') {
          format = "%v %s";
        }
    } else {
        thousand = ",";
        decimal = ".";
        format = "%s%v";
    }

    return accounting.formatMoney(number, symbol, 2, thousand, decimal, format);
  };
}
