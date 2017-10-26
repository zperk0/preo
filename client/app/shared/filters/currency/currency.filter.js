
export default function currency(StateService){
  "ngInject";

  var accounting = require("accounting");

  return function(number, withoutSymbol, decimals) {

    let config = StateService.getPriceConfig();

    if (withoutSymbol) {
      config.symbol = '';
      config.format = config.format.replace(' ', '');
    }

    var countDecimals = 2;
    if(!isNaN(decimals)){
      countDecimals = decimals;
    }

    return accounting.formatMoney(number, config.symbol, countDecimals, config.thousand, config.decimal, config.format);
  };
}
