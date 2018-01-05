//TODO: 
//1. implement exchanges code
//2. console.log to text file or csv -> will be used for future use to catch trends between exchange
let bittrexExchange = require('./exchanges/bittrex');
let gdaxExchange = require('./exchanges/gdax');
let geminiExchange = require('./exchanges/gemini');
let krakenExchange = require('./exchanges/kraken');
let binanceExchange = require('./exchanges/binance');

let app = {
    getPrices: function (success, error) {
        let bittrexReturned = false;//change to true if not using
        let gdaxReturned = false;
        let geminiReturned = false;
        let krakenReturned = false;
        let binanceReturned = true;

        let thePrices = {
            bittrexPrice: undefined,//comment out if not using and below code chunk
            gdaxPrice: undefined,
            geminiPrice: undefined,
            krakenPrice: undefined,
           // binancePrice: undefined
        };

        bittrexExchange.getPrice(coinTicker, function (price) {
            thePrices.bittrexPrice = price;
            bittrexReturned = true;
            if (bittrexReturned && gdaxReturned && geminiReturned
                && krakenReturned && binanceReturned) {
                success(thePrices);
            }
        }, error);

        gdaxExchange.getPrice(coinTicker, function (price) {
            thePrices.gdaxPrice = price;
            gdaxReturned = true;
            if (bittrexReturned && gdaxReturned && geminiReturned
                && krakenReturned && binanceReturned) {
                success(thePrices);
            }
        }, error);

        geminiExchange.getPrice(coinTicker, function (price) {
            thePrices.geminiPrice = price;
            geminiReturned = true;
            if (bittrexReturned && gdaxReturned && geminiReturned
                && krakenReturned && binanceReturned) {
                success(thePrices);
            }
        }, error);

        krakenExchange.getPrice(coinTicker, function (price) {
            thePrices.krakenPrice = price;
            krakenReturned = true;
            if (bittrexReturned && gdaxReturned && geminiReturned
                && krakenReturned && binanceReturned) {
                success(thePrices);
            }
        }, error);

        // binanceExchange.getPrice(coinTicker, function (price) {
        //     thePrices.binancePrice = price;
        //     binanceReturned = true;
        //     if (bittrexReturned && gdaxReturned && geminiReturned
        //         && krakenReturned && binanceReturned) {
        //         success(thePrices);
        //     }
        // }, error);
    },
    getMaxPrice: function (thePrices) {
        let arr = Object.values(thePrices);
        let max = Math.max(...arr);
        return max;
    },
    getMinPrice: function (thePrices) {
        let arr = Object.values(thePrices);
        let min = Math.min(...arr);
        return min;
    },
    getExchangeFromPrice: function (value, thePrices) {
        let exchange;
        switch (value) {
            case thePrices.bittrexPrice:
                exchange = 'bittrex';
                break;
            case thePrices.gdaxPrice:
                exchange = 'gdax';
                break;
            case thePrices.geminiPrice:
                exchange = 'gemini';
                break;
            case thePrices.krakenPrice:
                exchange = 'kraken';
                break;
            case thePrices.binancePrice:
                exchange = 'binance';
                break;
            default:
                exchange = 'none';
        }
        return exchange;
    },
    getFees: function (minExchangeName, maxExchangeName, coinTicker, howMuchCoinUSD, success, error) {
        let minExchangeReturned = false;
        let maxExchangeReturned = false;

        let theFees = {
            minExchangeFee: undefined,
            maxExchangeFee: undefined
        };
        this.getFee(minExchangeName, coinTicker, howMuchCoinUSD, function (fee) {
            theFees.minExchangeFee = fee;
            minExchangeReturned = true;
            if (minExchangeReturned && maxExchangeReturned) {
                success(theFees);
            }
        }, error);

        this.getFee(maxExchangeName, coinTicker, howMuchCoinUSD, function (fee) {
            theFees.maxExchangeFee = fee;
            maxExchangeReturned = true;
            if (minExchangeReturned && maxExchangeReturned) {
                success(theFees);
            }
        }, error);
    },
    getFee: function (exchangeName, coinTicker, howMuchCoinUSD, success, error) {
        switch (exchangeName) {
            case 'bittrex':
                bittrexExchange.getFee(coinTicker, howMuchCoinUSD, function (fee) {
                    success(fee);
                }, error);
                break;
            case 'gdax':
                gdaxExchange.getFee(coinTicker, howMuchCoinUSD, function (fee) {
                    success(fee);
                }, error);
                break;
            case 'gemini':
                geminiExchange.getFee(coinTicker, howMuchCoinUSD, function (fee) {
                    success(fee);
                }, error);
                break;
            case 'kraken':
                krakenExchange.getFee(coinTicker, howMuchCoinUSD, function (fee) {
                    success(fee);
                }, error);
                break;
            case 'binance':
                binanceExchange.getFee(coinTicker, howMuchCoinUSD, function (fee) {
                    success(fee);
                }, error);
                break;
            default:
                error('Could not find matching exchange!');
        }
    },
    doBuy: function (exchangeName, coinTicker, howMuchCoinUSD, success, error) {
        switch (exchangeName) {
            case 'bittrex':
                bittrexExchange.buyCoin(coinTicker, howMuchCoinUSD, success, error);
                break;
            case 'gdax':
                gdaxExchange.buyCoin(coinTicker, howMuchCoinUSD, success, error);
                break;
            case 'gemini':
                geminiExchange.buyCoin(coinTicker, howMuchCoinUSD, success, error);
                break;
            case 'kraken':
                krakenExchange.buyCoin(coinTicker, howMuchCoinUSD, success, error);
                break;
            case 'binance':
                binanceExchange.buyCoin(coinTicker, howMuchCoinUSD, success, error);
                break;
            default:
                error('Could not find matching exchange!');
        }
    },
    doSell: function (exchangeName, coinTicker, howMuchCoinUSD, success, error) {
        switch (exchangeName) {
            case 'bittrex':
                bittrexExchange.sellCoin(coinTicker, howMuchCoinUSD, success, error);
                break;
            case 'gdax':
                gdaxExchange.sellCoin(coinTicker, howMuchCoinUSD, success, error);
                break;
            case 'gemini':
                geminiExchange.sellCoin(coinTicker, howMuchCoinUSD, success, error);
                break;
            case 'kraken':
                krakenExchange.sellCoin(coinTicker, howMuchCoinUSD, success, error);
                break;
            case 'binance':
                binanceExchange.sellCoin(coinTicker, howMuchCoinUSD, success, error);
                break;
            default:
                error('Could not find matching exchange!');
        }
    },
    worthTrading: function (coinTicker, howMuchCoinUSD, minExchangeName, maxExchangeName, min, max, callback) {
        this.getFees(minExchangeName, maxExchangeName, coinTicker, howMuchCoinUSD, function (fees) {
            console.log('Min exchange ' + minExchangeName + ' fees are: ' + fees.minExchangeFee);
            console.log('Max exchange ' + maxExchangeName + ' fees are: ' + fees.maxExchangeFee);
            console.log('****************************************');
            const diff = max - min;
            const minExchangeFee = fees.minExchangeFee;
            const maxExchangeFee = fees.maxExchangeFee;
            const totalFees = minExchangeFee + maxExchangeFee;
            if (diff - totalFees > 1) {//TODO: decide on threshold - 10USD
                console.log('After this trade you will profit: ', (diff - totalFees));
                console.log('****************************************');
                callback(true);
            }
            else {
                callback(false);
            }
        }, function (error) {
            console.log('An error occurred while getting the fees: ', error);
            callback(false);
        });
    }
};

//Main Program - Arbit
//1.Choose currency: LTC, BTC, ETH
//Note: Gemini only has btc and eth
const coinTicker = 'btc';
const howMuchCoinUSD = 100;

//2.To start: do 'node arbit.js' from cmd line
console.log('****************************************');
console.log('Starting arbit for ' + coinTicker + ' and risking $' + howMuchCoinUSD + '...');
console.log('****************************************');

app.getPrices(function (thePrices) {
    console.log('Prices: ', thePrices);
    const max = app.getMaxPrice(thePrices);
    const maxExchange = app.getExchangeFromPrice(max, thePrices);
    const min = app.getMinPrice(thePrices);
    const minExchange = app.getExchangeFromPrice(min, thePrices);
    console.log('Max exchange: ' + maxExchange + ' at ' + max);
    console.log('Min exchange: ' + minExchange + ' at ' + min);
    console.log('****************************************');

    if (min !== max) {
        app.worthTrading(coinTicker, howMuchCoinUSD, minExchange, maxExchange, min, max, function (result) {
            if (result) {
                //continue doing the deed        
                console.log('Buying on ' + minExchange + '...');
                app.doBuy(minExchange, coinTicker, howMuchCoinUSD, function () {
                    console.log('Buy completed.');
                    console.log('****************************************');
                    console.log('Selling on ' + maxExchange + '...');
                    app.doSell(maxExchange, coinTicker, howMuchCoinUSD, function () {
                        console.log('Sell completed.');
                        console.log('****************************************');
                        console.log('********Thank you for your money********');
                        console.log('****************************************');
                    }, function (error) {
                        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                        console.log('Error occurred while trying to sell crypto!');
                        console.log(error);
                    })
                }, function (error) {
                    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                    console.log('Error occurred while trying to buy crypto!');
                    console.log(error);
                });
            }
            else {
                console.log('Was not worth the time and money, try again later.');
            }
        });
    } else {
        console.log('Min and Max are the same, no use in trading.');
    }
}, function (error) {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.log('Error occurred while trying to get prices!');
    console.log(error);
});
