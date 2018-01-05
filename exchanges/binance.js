//https://www.binance.com/restapipub.html#grip-content
var request = require("request");

var binance = {
    getPrice: function (coinTicker, success, error) {
        request("https://api.binance.com/api/v1/ticker/allPrices", function (err, response, body) {
            if (err) {
                error(err);
            } else {
                var resp = JSON.parse(body);
                for (var i = 0; i < resp.count; i++) {
                    if ((resp[i].symbol == 'BTCUSDT' && coinTicker == 'btc')
                        || (resp[i].symbol == 'ETHUSDT' && coinTicker == 'eth')
                        || (resp[i].symbol == 'LTCUSDT' && coinTicker == 'eth')                      
                    ) {
                        success(resp[i].price);
                    }
                }
            }
        });
    },
    getFee: function (coinTicker, howMuchCoinUSD, success, error) {
        success(1);
    },
    buyCoin: function (coinTicker, howMuchCoinUSD, success, error) {
        success();
    },
    sellCoin: function (coinTicker, howMuchCoinUSD, success, error) {
        success();
    }
};
module.exports = binance;