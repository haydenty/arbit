//https://gemini.com/api-agreement/#welcome-to-the-gemini-api
//https://docs.gemini.com/rest-api/
var request = require("request");

var gemini = {
    getPrice: function (coinTicker, success, error) {
        request("https://api.gemini.com/v1/pubticker/" + coinTicker + "usd", function (err, response, body) {
            if (err) {
                error(err);
            } else {
                var resp = JSON.parse(body);
                success(resp.last++);
            }
        });
    },
    getFee: function (coinTicker, howMuchCoinUSD, success, error) {
        //https://gemini.com/fee-schedule/#fee-schedule
        const fee = howMuchCoinUSD * 0.0025;
        success(fee);
    },
    buyCoin: function (coinTicker, howMuchCoinUSD, success, error) {
        success();
    },
    sellCoin: function (coinTicker, howMuchCoinUSD, success, error) {
        success();
    }
};
module.exports = gemini;