// https://testnet.binancefuture.com/en/futures/BTCUSDT
'use strict';

const ccxt = require ('ccxt');

(async function () {
    let binance = new ccxt.binance({
        apiKey: "key",
        secret: "secret",
        'enableRateLimit': true,
        'options': {
            'defaultType': 'future',
            'urls': {
                'api': 'https://testnet.binancefuture.com',
                'test': 'https://testnet.binancefuture.com',
            },
        },
    })
    binance.set_sandbox_mode(true)

    let data = {"priceIn":0.0,"timeIn":"", "priceOut":0.0, "timeOut":""}
    let traderData= []
    let isStart=false;
    const binanceData = await binance.fetch_closed_orders("BTCUSDT")
    for (const datum in binanceData){
        const reduceOnly = binanceData[datum].info.reduceOnly
        // console.log (datum + " reduceOnly = " +  JSON.stringify(reduceOnly) )

        if (!reduceOnly){ // opening trade
            if (isStart===false)
            {
                isStart= true
            }
            // console.log (datum + " avgPrice = " + JSON.stringify(binanceData[datum].info.avgPrice) )
            
            let datetime = binanceData[datum].datetime // example 2024-03-25T13:16:40.209Z
            // console.log(datum + " datetime " + datetime )
            let splitDate = datetime.split("T")
            
            const date = splitDate[0]
            // console.log(date)

            const time= splitDate[1].split(".")[0]// to hh:mm:ss
            // console.log(time)

            data = {"priceIn":binanceData[datum].info.avgPrice,"timeIn":binanceData[datum].datetime, "priceOut":0.0, "timeOut":""}
        }
        else{// closing trade
            if (isStart===true){
                data["priceOut"]= binanceData[datum].info.avgPrice
                data["timeOut"]= binanceData[datum].datetime
                traderData.push(data)
            }
        }
    }
    console.log("printing results: ")
    console.log(JSON.stringify(traderData))

}) ();


// sample data return from binance api
// needed data are price and datetime
// using "reduceOnly" as condition to differentiate between opening and closing trade.
// "reduceOnly" === false // opening trade
// "reduceOnly" === true  // closing trade

// [
//     {
//         "info": {
//             "orderId": "3740022915",
//             "symbol": "BTCUSDT",
//             "status": "FILLED",
//             "clientOrderId": "web_94Eyi97iS99jyl6pgNma",
//             "price": "0",
//             "avgPrice": "67136.40000",
//             "origQty": "0.014",
//             "executedQty": "0.014",
//             "cumQuote": "939.90960",
//             "timeInForce": "GTC",
//             "type": "MARKET",
//             "reduceOnly": false,
//             "closePosition": false,
//             "side": "BUY",
//             "positionSide": "BOTH",
//             "stopPrice": "0",
//             "workingType": "CONTRACT_PRICE",
//             "priceMatch": "NONE",
//             "selfTradePreventionMode": "NONE",
//             "goodTillDate": "0",
//             "priceProtect": false,
//             "origType": "MARKET",
//             "time": "1711372600209",
//             "updateTime": "1711372600215"
//         },
//         "id": "3740022915",
//         "clientOrderId": "web_94Eyi97iS99jyl6pgNma",
//         "timestamp": 1711372600209,
//         "datetime": "2024-03-25T13:16:40.209Z",
//         "lastTradeTimestamp": 1711372600215,
//         "lastUpdateTimestamp": 1711372600215,
//         "symbol": "BTC/USDT:USDT",
//         "type": "market",
//         "timeInForce": "GTC",
//         "postOnly": false,
//         "reduceOnly": false,
//         "side": "buy",
//         "price": 67136.4,
//         "amount": 0.014,
//         "cost": 939.9096,
//         "average": 67136.4,
//         "filled": 0.014,
//         "remaining": 0,
//         "status": "closed",
//         "trades": [],
//         "fees": []
//     },
//     {
//         "info": {
//             "orderId": "3740023229",
//             "symbol": "BTCUSDT",
//             "status": "FILLED",
//             "clientOrderId": "web_9rh0bUkQCkrhSH24NyXj",
//             "price": "0",
//             "avgPrice": "66943.21429",
//             "origQty": "0.014",
//             "executedQty": "0.014",
//             "cumQuote": "937.20500",
//             "timeInForce": "GTC",
//             "type": "MARKET",
//             "reduceOnly": true,
//             "closePosition": false,
//             "side": "SELL",
//             "positionSide": "BOTH",
//             "stopPrice": "0",
//             "workingType": "CONTRACT_PRICE",
//             "priceMatch": "NONE",
//             "selfTradePreventionMode": "NONE",
//             "goodTillDate": "0",
//             "priceProtect": false,
//             "origType": "MARKET",
//             "time": "1711372639495",
//             "updateTime": "1711372639504"
//         },
//         "id": "3740023229",
//         "clientOrderId": "web_9rh0bUkQCkrhSH24NyXj",
//         "timestamp": 1711372639495,
//         "datetime": "2024-03-25T13:17:19.495Z",
//         "lastTradeTimestamp": 1711372639504,
//         "lastUpdateTimestamp": 1711372639504,
//         "symbol": "BTC/USDT:USDT",
//         "type": "market",
//         "timeInForce": "GTC",
//         "postOnly": false,
//         "reduceOnly": true,
//         "side": "sell",
//         "price": 66943.21429,
//         "amount": 0.014,
//         "cost": 937.205,
//         "average": 66943.21429,
//         "filled": 0.014,
//         "remaining": 0,
//         "status": "closed",
//         "trades": [],
//         "fees": []
//     }
// ]


// sample data extracted for TradeSensei use

// [
//     {
//         "priceIn": "67136.40000",
//         "timeIn": "2024-03-25T13:16:40.209Z",
//         "priceOut": "66943.21429",
//         "timeOut": "2024-03-25T13:17:19.495Z"
//     },
//     {
//         "priceIn": "67850.00000",
//         "timeIn": "2024-03-25T14:32:39.193Z",
//         "priceOut": "67820.10000",
//         "timeOut": "2024-03-25T14:32:44.849Z"
//     },
//     {
//         "priceIn": "67850.00000",
//         "timeIn": "2024-03-25T14:32:59.743Z",
//         "priceOut": "67820.10000",
//         "timeOut": "2024-03-25T14:33:02.823Z"
//     },
//     {
//         "priceIn": "67850.00000",
//         "timeIn": "2024-03-25T14:33:07.072Z",
//         "priceOut": "67820.10000",
//         "timeOut": "2024-03-25T14:33:09.939Z"
//     },
//     {
//         "priceIn": "67850.00000",
//         "timeIn": "2024-03-25T14:33:14.303Z",
//         "priceOut": "67820.10000",
//         "timeOut": "2024-03-25T14:33:17.355Z"
//     },
//     {
//         "priceIn": "67850.00000",
//         "timeIn": "2024-03-25T14:33:56.223Z",
//         "priceOut": "67820.10000",
//         "timeOut": "2024-03-25T14:34:00.924Z"
//     },
//     {
//         "priceIn": "67850.00000",
//         "timeIn": "2024-03-25T14:34:03.983Z",
//         "priceOut": "67820.00000",
//         "timeOut": "2024-03-25T14:34:05.959Z"
//     },
//     {
//         "priceIn": "67850.00000",
//         "timeIn": "2024-03-25T14:34:08.771Z",
//         "priceOut": "67820.00000",
//         "timeOut": "2024-03-25T14:34:10.799Z"
//     },
//     {
//         "priceIn": "67850.00000",
//         "timeIn": "2024-03-25T14:34:40.111Z",
//         "priceOut": "67820.00000",
//         "timeOut": "2024-03-25T14:34:42.615Z"
//     },
//     {
//         "priceIn": "67850.00000",
//         "timeIn": "2024-03-25T14:34:46.559Z",
//         "priceOut": "67820.00000",
//         "timeOut": "2024-03-25T14:34:49.255Z"
//     }
// ]