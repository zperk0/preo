
export default function currency(StateService){
  "ngInject";

  var accounting = require("accounting");

  return function(number, withoutSymbol, decimals, overrideSymbol) {

    let config = StateService.getPriceConfig();

    if (withoutSymbol) {
      config.symbol = '';
      config.format = config.format.replace(' ', '');
    }

    if (overrideSymbol) {
      config.symbol = overrideSymbol;
    }

    var countDecimals = 2;
    if(!isNaN(decimals)){
      countDecimals = decimals;
    }

    return accounting.formatMoney(number, config.symbol, countDecimals, config.thousand, config.decimal, config.format);
  };
}
