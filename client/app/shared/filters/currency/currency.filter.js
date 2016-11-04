
export default function currency(VenueService){
  "ngInject";

  var accounting = require("accounting");

  return function(number, withoutSymbol) {

    let config = VenueService.getVenuePriceConfig();

    if (withoutSymbol) {
      config.symbol = '';
    }

    return accounting.formatMoney(number, config.symbol, 2, config.thousand, config.decimal, config.format);
  };
}
