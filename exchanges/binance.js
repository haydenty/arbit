//https://www.binance.com/restapipub.html#grip-content
var request = require("request");

var binance = {
    getPrice: function (coinTicker, success, error) {
        request("https://api.binance.com/api/v1/ticker/allPrices", function (err, response, body) {
            if (err) {
                error(err);
            } else {
                var resp = JSON.parse(body);
                for (var i = 0; i < resp.length; i++) {
                    if ((resp[i].symbol == 'BTCUSDT' && coinTicker == 'btc')
                        || (resp[i].symbol == 'ETHUSDT' && coinTicker == 'eth')
                        || (resp[i].symbol == 'LTCUSDT' && coinTicker == 'ltc')                      
                    ) {
                        success(resp[i].price++);
                    }
                }
            }
        });
    },
    getFee: function (coinTicker, howMuchCoinUSD, success, error) {
        //https://support.binance.com/hc/en-us/articles/115000429332
        success(howMuchCoinUSD * 0.001);
    },
    buyCoin: function (coinTicker, howMuchCoinUSD, success, error) {
        success();
    },
    sellCoin: function (coinTicker, howMuchCoinUSD, success, error) {
        success();
    }
};
module.exports = binance;