https://docs.gdax.com/#api
var request = require("request");

var gdax = {
    getPrice: function (coinTicker, success, error) {
        var options = {
            url: "https://api.gdax.com/products/" + coinTicker + "-usd/ticker",
            headers: {
                'User-Agent': 'request'
            }
        };
        request(options, function (err, response, body) {
            if (err) {
                error(err);
            } else {
                var resp = JSON.parse(body);
                success(resp.price++);//convert to number
            }
        });
    },
    getFee: function (coinTicker, howMuchCoinUSD, success, error) {
        success(0.5);
    },
    buyCoin: function (coinTicker, howMuchCoinUSD, success, error) {
        success();
    },
    sellCoin: function (coinTicker, howMuchCoinUSD, success, error) {
        success();
    }
};
module.exports = gdax;