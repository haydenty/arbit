//https://www.bittrex.com/Home/Api
var request = require("request");

var bittrex = {
    getPrice: function (coinTicker, success, error) {
        request("https://bittrex.com/api/v1.1/public/getticker?market=USDT-" + coinTicker, function (err, response, body) {
            if (err) {
                error(err);
            } else {
                var resp = JSON.parse(body);
                success(resp.result.Last);
            }
        });
    },
    getFee: function (coinTicker, howMuchCoinUSD, success, error) {
        //https://bittrex.com/Fees
        success(howMuchCoinUSD * 0.0025);
    },
    buyCoin: function (coinTicker, howMuchCoinUSD, success, error) {
        success();
    },
    sellCoin: function (coinTicker, howMuchCoinUSD, success, error) {
        success();
    }
};
module.exports = bittrex;