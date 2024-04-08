// https://testnet.binancefuture.com/en/futures/BTCUSDT
// https://binance-docs.github.io/apidocs/futures/en/#general-info
// https://docs.ccxt.com/#/examples/js/
// https://data.binance.vision/?prefix=data/futures/um/daily/klines/BTCUSDT/5m/
"use strict";

const ccxt = require("ccxt");
const ApplicantRecordModel = require("../models/ApplicantRecordModel");
// const { timeout } = require("ccxt/js/src/base/functions");
async function seedApplicant(traderData) {
    try {
        await ApplicantRecordModel.deleteMany({});        
        for (const cycleNumber in traderData) {
            console.log(JSON.stringify(traderData));

            await ApplicantRecordModel.create([
                {
                    applicantId: traderData[cycleNumber].applicantId,
                    applicantName: "Adam",
                    executedQty: traderData[cycleNumber].executedQty,
                    tradeType: traderData[cycleNumber].tradeType,
                    priceIn: traderData[cycleNumber].princeIn,
                    timeIn: traderData[cycleNumber].timeIn,
                    priceOut: traderData[cycleNumber].princeOut,
                    timeOut: traderData[cycleNumber].timeOut,
                    managers: [],
                },
            ]);
        }
    } catch (error) {
        console.error(error.message);
    }
}

async function applicantData() {
    let binance = new ccxt.binance({
        apiKey: "33abb9bbd90c07de6420d2c782df3efb8fbc7ab65be3b3091e1ad0de3a1f1831",
        secret: "5c19a06e96ad5572c938b14f0b6776a6a19cde77d2e4f1baf10ba55bd1acc11c",

        // apiKey: `${process.env.BINANCE_PUBLIC_API_KEY}`,
        // secret: `${process.env.BINANCE_SECRET_PRIVATE_KEY}`,

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

            // let datetime = binanceData[datum].datetime; // example 2024-03-25T13:16:40.209Z
            // let splitDate = datetime.split("T");
            // const date = splitDate[0];
            // const time = splitDate[1].split(".")[0]; // to hh:mm:ss

            // console.log(datum + " datetime " + datetime )
            // console.log(date)
            // console.log(time)

            data = {
                applicantId: "A1000", // need to change id as new applicant comes in
                priceIn: binanceData[datum].info.avgPrice,
                executedQty: binanceData[datum].info.executedQty,
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
                // console.log(data)
            }
        }
    }
    // console.log("printing results: ");
    // console.log(JSON.stringify(traderData));

    // const datediff = binance.parse8601(traderData[0].timeOut)-binance.parse8601(traderData[0].timeIn)
    // console.log(datediff)
    // const datediffString = new Date(datediff)
    // console.log(`datediffString=${datediffString}`)
    console.log(
        "adsfdsfjdsalfkdjflkdsjflkadsjflksajlfkdsajflkdsajfldaksfjldksfjldsakjfkdskjfldsjlfdsa  "
    );
    console.log("hello" + JSON.stringify(traderData));
    traderData = structuredClone(demoApplicantData())
    console.log("hello2" + JSON.stringify(traderData));
    seedApplicant(traderData);
    return traderData;
} // end of function applicantData

function demoApplicantData() {
    const traderData = [
        {
            applicantId: "A1000",
            executedQty: 1.0,
            tradeType: "long",
            priceIn: "27485.60000",
            timeIn: "2023-10-16T11:10:29.551Z",
            priceOut: "35460.00000",
            timeOut: "2023-10-23T11:16:44.991Z",
        },
        {
            applicantId: "A1000",
            executedQty: 1.0,
            tradeType: "long",
            priceIn: "38290.00000",
            timeIn: "2023-12-01T11:16:52.687Z",
            priceOut: "43896.71990",
            timeOut: "2023-12-06T11:17:07.259Z",
        },
        {
            applicantId: "A1000",
            executedQty: 1.0,
            tradeType: "long",
            priceIn: "44384.14286",
            timeIn: "2024-01-08T14:47:27.131Z",
            priceOut: "45846.20000",
            timeOut: "2024-01-12T14:47:50.690Z",
        },
        {
            applicantId: "A1000",
            executedQty: 1.0,
            tradeType: "long",
            priceIn: "42677.00000",
            timeIn: "2024-02-04T11:16:52.687Z",
            priceOut: "49502.71990",
            timeOut: "2024-02-13T11:17:07.259Z",
        },
        {
            applicantId: "A1000",
            executedQty: 1.0,
            tradeType: "short",
            priceIn: "52183.14286",
            timeIn: "2024-02-15T14:47:27.131Z",
            priceOut: "52183.20000",
            timeOut: "2024-02-22T14:47:50.690Z",
        },
        {
            applicantId: "A1000",
            executedQty: 1.0,
            tradeType: "long",
            priceIn: "51452.00000",
            timeIn: "2024-02-24T03:08:00.448Z",
            priceOut: "61689.00000",
            timeOut: "2024-02-29T03:10:50.919Z",
        },
        {
            applicantId: "A1000",
            executedQty: 1.0,
            tradeType: "long",
            priceIn: "68270.00000",
            timeIn: "2024-03-04T04:52:27.270Z",
            priceOut: "61202.57497",
            timeOut: "2024-03-05T11:03:52.544Z",
        },
        {
            applicantId: "A1000",
            executedQty: 1.0,
            tradeType: "short",
            priceIn: "67783.10000",
            timeIn: "2024-03-08T11:04:59.819Z",
            priceOut: "72170.00000",
            timeOut: "2024-03-11T11:05:19.755Z",
        },
        {
            applicantId: "A1000",
            executedQty: 1.0,
            tradeType: "short",
            priceIn: "67295.60000",
            timeIn: "2024-03-19T11:09:53.263Z",
            priceOut: "64614.20000",
            timeOut: "2024-03-24T11:10:00.331Z",
        },
        {
            applicantId: "A1000",
            executedQty: 1.0,
            priceIn: "64614.60000",
            timeIn: "2024-03-24T11:10:11.055Z",
            priceOut: "69002.27788",
            timeOut: "2024-03-27T11:10:15.312Z",
        },

        

        {
            applicantId: "A2000",
            executedQty: 1.0,
            tradeType: "long",
            priceIn: "27485.60000",
            timeIn: "2023-10-16T11:10:29.551Z",
            priceOut: "35460.00000",
            timeOut: "2023-10-23T11:16:44.991Z",
        },
        {
            applicantId: "A2000",
            executedQty: 1.0,
            tradeType: "long",
            priceIn: "38290.00000",
            timeIn: "2023-12-01T11:16:52.687Z",
            priceOut: "43896.71990",
            timeOut: "2023-12-06T11:17:07.259Z",
        },
        {
            applicantId: "A2000",
            executedQty: 1.0,
            tradeType: "long",
            priceIn: "44384.14286",
            timeIn: "2024-01-08T14:47:27.131Z",
            priceOut: "45846.20000",
            timeOut: "2024-01-12T14:47:50.690Z",
        },
        {
            applicantId: "A2000",
            executedQty: 1.0,
            tradeType: "long",
            priceIn: "42677.00000",
            timeIn: "2024-02-04T11:16:52.687Z",
            priceOut: "49502.71990",
            timeOut: "2024-02-13T11:17:07.259Z",
        },
        {
            applicantId: "A2000",
            executedQty: 1.0,
            tradeType: "short",
            priceIn: "52183.14286",
            timeIn: "2024-02-15T14:47:27.131Z",
            priceOut: "52183.20000",
            timeOut: "2024-02-22T14:47:50.690Z",
        },
        {
            applicantId: "A2000",
            executedQty: 1.0,
            tradeType: "long",
            priceIn: "51452.00000",
            timeIn: "2024-02-24T03:08:00.448Z",
            priceOut: "61689.00000",
            timeOut: "2024-02-29T03:10:50.919Z",
        },
        {
            applicantId: "A2000",
            executedQty: 1.0,
            tradeType: "long",
            priceIn: "68270.00000",
            timeIn: "2024-03-04T04:52:27.270Z",
            priceOut: "61202.57497",
            timeOut: "2024-03-05T11:03:52.544Z",
        },
        {
            applicantId: "A2000",
            executedQty: 1.0,
            tradeType: "short",
            priceIn: "67783.10000",
            timeIn: "2024-03-08T11:04:59.819Z",
            priceOut: "72170.00000",
            timeOut: "2024-03-11T11:05:19.755Z",
        },
        {
            applicantId: "A2000",
            executedQty: 1.0,
            tradeType: "short",
            priceIn: "67295.60000",
            timeIn: "2024-03-19T11:09:53.263Z",
            priceOut: "64614.20000",
            timeOut: "2024-03-24T11:10:00.331Z",
        },
        {
            applicantId: "A2000",
            executedQty: 1.0,
            priceIn: "64614.60000",
            timeIn: "2024-03-24T11:10:11.055Z",
            priceOut: "69002.27788",
            timeOut: "2024-03-27T11:10:15.312Z",
        },        


        {
            applicantId: "A3000",
            executedQty: 1.0,
            tradeType: "long",
            priceIn: "27485.60000",
            timeIn: "2023-10-16T11:10:29.551Z",
            priceOut: "35460.00000",
            timeOut: "2023-10-23T11:16:44.991Z",
        },
        {
            applicantId: "A3000",
            executedQty: 1.0,
            tradeType: "long",
            priceIn: "38290.00000",
            timeIn: "2023-12-01T11:16:52.687Z",
            priceOut: "43896.71990",
            timeOut: "2023-12-06T11:17:07.259Z",
        },
        {
            applicantId: "A3000",
            executedQty: 1.0,
            tradeType: "long",
            priceIn: "44384.14286",
            timeIn: "2024-01-08T14:47:27.131Z",
            priceOut: "45846.20000",
            timeOut: "2024-01-12T14:47:50.690Z",
        },
        {
            applicantId: "A3000",
            executedQty: 1.0,
            tradeType: "long",
            priceIn: "42677.00000",
            timeIn: "2024-02-04T11:16:52.687Z",
            priceOut: "49502.71990",
            timeOut: "2024-02-13T11:17:07.259Z",
        },
        {
            applicantId: "A3000",
            executedQty: 1.0,
            tradeType: "short",
            priceIn: "52183.14286",
            timeIn: "2024-02-15T14:47:27.131Z",
            priceOut: "52183.20000",
            timeOut: "2024-02-22T14:47:50.690Z",
        },
        {
            applicantId: "A3000",
            executedQty: 1.0,
            tradeType: "long",
            priceIn: "51452.00000",
            timeIn: "2024-02-24T03:08:00.448Z",
            priceOut: "61689.00000",
            timeOut: "2024-02-29T03:10:50.919Z",
        },
        {
            applicantId: "A3000",
            executedQty: 1.0,
            tradeType: "long",
            priceIn: "68270.00000",
            timeIn: "2024-03-04T04:52:27.270Z",
            priceOut: "61202.57497",
            timeOut: "2024-03-05T11:03:52.544Z",
        },
        {
            applicantId: "A3000",
            executedQty: 1.0,
            tradeType: "short",
            priceIn: "67783.10000",
            timeIn: "2024-03-08T11:04:59.819Z",
            priceOut: "72170.00000",
            timeOut: "2024-03-11T11:05:19.755Z",
        },
        {
            applicantId: "A3000",
            executedQty: 1.0,
            tradeType: "short",
            priceIn: "67295.60000",
            timeIn: "2024-03-19T11:09:53.263Z",
            priceOut: "64614.20000",
            timeOut: "2024-03-24T11:10:00.331Z",
        },
        {
            applicantId: "A3000",
            executedQty: 1.0,
            priceIn: "64614.60000",
            timeIn: "2024-03-24T11:10:11.055Z",
            priceOut: "69002.27788",
            timeOut: "2024-03-27T11:10:15.312Z",
        },           
    ];
    console.log(`traderData= ${JSON.stringify(traderData)}`);
    return traderData;
}

async function priceData(dateString, numberOfDays) {
    let binance = new ccxt.binance({
        apiKey: "33abb9bbd90c07de6420d2c782df3efb8fbc7ab65be3b3091e1ad0de3a1f1831",
        secret: "5c19a06e96ad5572c938b14f0b6776a6a19cde77d2e4f1baf10ba55bd1acc11c",

        // apiKey: `${process.env.BINANCE_PUBLIC_API_KEY}`,
        // secret: `${process.env.BINANCE_SECRET_PRIVATE_KEY}`,
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

    let traderData = [];
    let isStart = false;
    // dateString = "2024-03-28T00:00:00.000Z"
    // dateString = "2023-12-05T11:00:00Z" //working
    dateString = JSON.stringify(dateString);
    dateString = dateString.replace(/\"/g, "");
    let from_ts = binance.parse8601(dateString);
    // console.log(`dateString=${dateString}`)
    // console.log(`from_ts=${from_ts}`)
    // fetchOHLCV(symbol: string, timeframe?: string, since?: Int, limit?: Int, params?: {}): Promise<OHLCV[]>;

    // FOR 5m CALCULATION---------------
    // 288 constitute 5*12*24 = 5*288 = 1440 mins in a full day(24hrs)  (2880 rep 10days...)
    // 12 constitute 1hr (24 rep 2hrs....)
    // 1 constiute 5mins (6 rep 30mins...)

    // FOR 1d CALCULATION---------------
    // 30 constitute roughly 1 month
    const binanceData = await binance.fetchOHLCV(
        "BTCUSDT",
        "1d",
        from_ts,
        numberOfDays
    );

    // console.log(from_ts)
    // console.log(new Date(binanceData[0][0]))
    // console.log(new Date(binanceData[1][0]))
    // console.log(binanceData[0][0])
    // console.log("binanceData " + JSON.stringify(binanceData[0]))

    // console.log(binanceData[0][0])  //1709251200000
    // console.log(new Date(binanceData[0][0]))               //Fri Mar 01 2024 08:00:00 GMT+0800 (Singapore Standard Time)
    // console.log(new Date(binanceData[0][0]).toUTCString()) //Fri Mar 01 2024 08:00:00 GMT+0800 (Singapore Standard Time)
    // console.log(new Date(binanceData[0][0]).toDateString()) //Fri Mar 01 2024
    // console.log(new Date(binanceData[0][0]).toTimeString()) //08:00:00 GMT+0800 (Singapore Standard Time)
    // console.log(JSON.stringify(new Date(binanceData[0][0]))) // "2024-03-01T00:00:00.000Z"
    // console.log(JSON.stringify(new Date(binanceData[0][0]).getFullYear())) //2024
    // console.log(JSON.stringify(new Date(binanceData[0][0]).getDate())) //1
    // console.log(JSON.stringify(new Date(binanceData[0][0]).getTime())) //1709251200000
    // console.log(JSON.stringify(new Date(binanceData[0][0]).getHours())) //8
    // console.log(JSON.stringify(new Date(binanceData[0][0]).getMinutes()))  //0

    // console.log("")
    // console.log(JSON.stringify(new Date(binanceData[0][0]).getUTCMonth())) //2  why 2? should be 3 since it is march
    // console.log(JSON.stringify(new Date(binanceData[0][0]).getMonth())) //2   why 2? should be 3 since it is march

    let data = [];
    let singleData = {
        time: { year: -1, month: -1, day: -1 },
        open: 0.0,
        high: 0.0,
        low: 0.0,
        close: 0.0,
        volume: 0.0,
    };

    for (const datum in binanceData) {
        const date = new Date(binanceData[datum][0]);

        let year = date.getFullYear();
        let month = date.getMonth() + 1; //there is bug in the api of getMonth()
        let day = date.getDate();

        singleData = {
            time: { year: year, month: month, day: day },
            open: binanceData[datum][1],
            high: binanceData[datum][2],
            low: binanceData[datum][3],
            close: binanceData[datum][4],
            volume: binanceData[datum][5],
        };
        data.push(singleData);
        // console.log(`${datum} ${new Date(binanceData[datum][0])} ${JSON.stringify(singleData)}`)
        // console.log(datum + " " + new Date(binanceData[datum][0]))
    }
    // console.log(JSON.stringify(data))
    return data;
}

const getFullRangeOfPriceChart = async (req, res) => {
    console.log("getFullRangeOfPriceChart");
    // async function getFullRangeOfPriceChart() {

    const applicantTrades= await applicantData()
    // const applicantTrades = demoApplicantData();
    console.log("after demo = " + JSON.stringify(applicantTrades));

    let getApplicantDataAndPriceChart = [];
    let oneData = {};
    console.log("for loop");
    for (const tradeNumber in applicantTrades) {
        console.log(`tradeNumber=${tradeNumber}`);
        const trade = applicantTrades[tradeNumber];
        console.log(JSON.stringify(trade));

        const offSetDays = 5;

        // day diff + start date which is already offset leftside + right side offset
        const numberOfDays =
            getDayDiff(trade.timeIn, trade.timeOut) + 2 * offSetDays;
        let leftSideDate = new Date(trade.timeIn.split("T")[0]);
        leftSideDate.setDate(leftSideDate.getDate() - offSetDays);
        // console.log(`leftSideDate = ${leftSideDate}`)
        const priceChart = await priceData(leftSideDate, numberOfDays);
        // console.log(`priceChart=${JSON.stringify(priceChart)}`)

        oneData = {
            applicantTrade: trade,
            priceChart: priceChart,
        };
        getApplicantDataAndPriceChart.push(oneData);
    }
    console.log(JSON.stringify(getApplicantDataAndPriceChart));
    res.json(getApplicantDataAndPriceChart);
};

function getDayDiff(timeIn, timeOut) {
    console.log(JSON.stringify(timeIn));
    console.log(JSON.stringify(timeOut));

    const date1 = new Date(timeIn.split("T")[0]);
    let date2 = new Date(timeOut.split("T")[0]);
    date2.setDate(date2.getDate() + 1);

    // console.log(date1)
    // console.log(date2)

    const diffTime = Math.abs(date2 - date1);
    // console.log(`diffTime=${diffTime}`)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // console.log(`diffDays=${diffDays}`)

    return diffDays;
}

// getFullRangeOfPriceChart()
// priceData("2023-12-05T11:00:00.000Z", 10)
// priceData("2023-12-05T11:00:00Z", 10)

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

module.exports = { getFullRangeOfPriceChart, seedApplicant };
