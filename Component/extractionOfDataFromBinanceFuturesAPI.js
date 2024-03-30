// https://testnet.binancefuture.com/en/futures/BTCUSDT
// https://binance-docs.github.io/apidocs/futures/en/#general-info
// https://docs.ccxt.com/#/examples/js/
// https://data.binance.vision/?prefix=data/futures/um/daily/klines/BTCUSDT/5m/
"use strict";

const ccxt = require("ccxt");


async function applicantData() { 

  let binance = new ccxt.binance({
    apiKey: `${process.env.BINANCE_PUBLIC_API_KEY}`,
    secret: `${process.env.BINANCE_SECRET_PRIVATE_KEY}`,

    enableRateLimit: true,
    options: {
      defaultType: "future",
      urls: {
        // api: "https://api.binance.com",
        // test: "https://api.binance.com",        
        api: "https://testnet.binancefuture.com",
        test: "https://testnet.binancefuture.com",
      },
    },
  });
  binance.set_sandbox_mode(true);

  let data = { priceIn: 0.0, timeIn: "", priceOut: 0.0, timeOut: "" };
  let traderData = [];
  let isStart = false;
  // const binanceData = await binance.fetch_closed_orders("BTCUSDT");
  const binanceData = await binance.fetchClosedOrders("BTCUSDT");
  
  for (const datum in binanceData) {
    const reduceOnly = binanceData[datum].info.reduceOnly;
    // console.log (datum + " reduceOnly = " +  JSON.stringify(reduceOnly) )

    if (!reduceOnly) {
      // opening trade
      if (isStart === false) {
        isStart = true;
      }
      // console.log (datum + " avgPrice = " + JSON.stringify(binanceData[datum].info.avgPrice) )

      let datetime = binanceData[datum].datetime; // example 2024-03-25T13:16:40.209Z
      // console.log(datum + " datetime " + datetime )
      let splitDate = datetime.split("T");

      const date = splitDate[0];
      // console.log(date)

      const time = splitDate[1].split(".")[0]; // to hh:mm:ss
      // console.log(time)

      data = {
        priceIn: binanceData[datum].info.avgPrice,
        timeIn: binanceData[datum].datetime,
        priceOut: 0.0,
        timeOut: "",
      };
    } else {
      // closing trade
      if (isStart === true) {
        data["priceOut"] = binanceData[datum].info.avgPrice;
        data["timeOut"] = binanceData[datum].datetime;
        traderData.push(data);
      }
    }
  }
  console.log("printing results: ");
  console.log(JSON.stringify(traderData));
}

async function priceData() { 
  let binance = new ccxt.binance({
    apiKey: `${process.env.BINANCE_PUBLIC_API_KEY}`,
    secret: `${process.env.BINANCE_SECRET_PRIVATE_KEY}`,
    enableRateLimit: true,
    options: {
      defaultType: "future",
      urls: {
        // api: "https://api.binance.com",
        // test: "https://api.binance.com",
        api: "https://testnet.binancefuture.com",
        test: "https://testnet.binancefuture.com",
      },
    },
  });
  binance.set_sandbox_mode(true);
  // console.log(JSON.stringify(binance.timeframes))
  let data = { 
    open: 0.0,
    high: 0.0,
    low: 0.0,
    close: 0.0,
    volume: 0.0
  };
  let traderData = [];
  let isStart = false;
  let from_ts = binance.parse8601('2024-03-01T00:00:00.000Z')
  // fetchOHLCV(symbol: string, timeframe?: string, since?: Int, limit?: Int, params?: {}): Promise<OHLCV[]>;

  // FOR 5m CALCULATION---------------
  // 288 constitute 5*12*24 = 5*288 = 1440 mins in a full day(24hrs)  (2880 rep 10days...)
  // 12 constitute 1hr (24 rep 2hrs....)
  // 1 constiute 5mins (6 rep 30mins...)
  const binanceData = await binance.fetchOHLCV("BTCUSDT", "5m", from_ts,288);

  // console.log(from_ts)
  // console.log(new Date(binanceData[0][0]))
  // console.log(new Date(binanceData[1][0]))
  // console.log(binanceData[0][0])

  // console.log("binanceData " + JSON.stringify(binanceData[0]))
  for (const datum in binanceData) {
    data = { 
      open:   binanceData[datum][1],
      high:   binanceData[datum][2],
      low:    binanceData[datum][3],
      close:  binanceData[datum][4],
      volume: binanceData[datum][5]
    };    
    console.log(datum + " " + new Date(binanceData[datum][0]))
  }
}


// priceData()
applicantData()


// sample data return from binance api
// needed data are price and datetime
// using "reduceOnly" as condition to differentiate between opening and closing trade.
// "reduceOnly" === false // opening trade
// "reduceOnly" === true  // closing trade
// oldest data to latest data , timezone in UTC 0

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
