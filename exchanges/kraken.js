//https://www.kraken.com/help/api#general-usage
var request = require("request");

var kraken = {
    getPrice: function (coinTicker, success, error) {
        let ct = coinTicker;
        if(coinTicker == 'btc'){
            ct = 'xbt';
        }
        request("https://api.kraken.com/0/public/Ticker?pair=" + ct + "usd", function (err, response, body) {
            if (err) {
                error(err);
            } else {
                var resp = JSON.parse(body);
                if(coinTicker =='btc'){
                    success(resp.result.XXBTZUSD.c[0]++);                   
                }
                else if(coinTicker == 'ltc'){
                    success(resp.result.XLTCZUSD.c[0]++);//FIXME:property name is named after ticker...                                       
                }
                else if(coinTicker == 'eth'){
                    success(resp.result.XETHZUSD.c[0]++);//FIXME:property name is named after ticker...                               
                }
            }
        });
    },
    getFee: function (coinTicker, howMuchCoinUSD, success, error) {
        //https://www.kraken.com/en-us/help/fees
        success(howMuchCoinUSD * 0.0026);
    },
    buyCoin: function (coinTicker, howMuchCoinUSD, success, error) {
        success();
    },
    sellCoin: function (coinTicker, howMuchCoinUSD, success, error) {
        success();
    }
};
module.exports = kraken;