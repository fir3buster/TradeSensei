import { ColorType, createChart } from 'lightweight-charts';
import React,  {useEffect, useRef , useState} from 'react';

const CandleStick2 = (props) => {
    const [activePage, setActivePage] = useState(-99)
    const chartContainerRef = useRef()
    console.log("into candlestick2")
    // console.log(`JSON candlestick2= ${JSON.stringify(props.tradeData)}`)    

    // console.log(`activePage=${activePage}`)
    console.log(`props.activePage=${props.activePage}`)
    if (activePage != props.activePage){
        console.log(`inside condition: ${activePage}, ${props.activePage}`)
        // console.log(`inside condition:  JSON= ${JSON.stringify(props.tradeData)}`)        
        setActivePage(props.activePage)
    }

    useEffect(()=>{
        if(props.tradeData){        
            // Lightweight Charts™ Example: Series Markers
            // https://tradingview.github.io/lightweight-charts/tutorials/how_to/series-markers
            // console.log(`USEEFFECT JSON= ${JSON.stringify(props.tradeData)}`)
            const chartOptions = {
                layout: {
                    textColor: 'white',
                    background: { type: 'solid', color: 'radial-gradient(rgba(0, 0, 0, 0.05) 30%, transparent)' },
                    // background: "radial-gradient(rgba(0, 0, 0, 0.05) 30%, transparent)"
                },
                width:1000,
                height:500,
            };

            
            /** @type {import('lightweight-charts').IChartApi} */
            // const chart = createChart(document.getElementById('container'), chartOptions);
            const chart = createChart(chartContainerRef.current, chartOptions)
            chart.applyOptions({
                watermark: {
                    visible: true,
                    fontSize: 72,
                    horzAlign: 'left',
                    vertAlign: 'top',
                    color: 'grey',
                    text: 'TradeSensei',
                },
            })

            const series = chart.addCandlestickSeries({
                upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
                wickUpColor: '#26a69a', wickDownColor: '#ef5350',
            });

            // const data = props.tradeData.priceChart

            const data = structuredClone(props.tradeData["priceChart"])

        
            series.setData(data);

            // determining the dates for the 'buy' and 'sell' markers added below.
            // const datesForMarkers = [data[data.length - 39], data[data.length - 19]];
            // let indexOfMinPrice = 0;
            // for (let i = 1; i < datesForMarkers.length; i++) {
            //     if (datesForMarkers[i].high < datesForMarkers[indexOfMinPrice].high) {
            //         indexOfMinPrice = i;
            //     }
            // }

            // const markers = [
            //     {
            //         time: data[data.length - 48].time,
            //         position: 'aboveBar',
            //         color: '#f68410',
            //         shape: 'circle',
            //         text: 'D',
            //     },
            // ];

            // create price line**********************************************************
            let myPriceLine = {}
            const markers=[]
            const timeIn   = props.tradeData["applicantTrade"]["timeIn"].split("T")[0]
            const timeOut  = props.tradeData["applicantTrade"]["timeOut"].split("T")[0]
            const priceIn  = parseFloat(props.tradeData["applicantTrade"]["priceIn"])
            const priceOut = parseFloat(props.tradeData["applicantTrade"]["priceOut"])
            const executedQty = props.tradeData["applicantTrade"]["executedQty"]
            let longPnL = ((priceOut-priceIn)*executedQty)
            longPnL= (Math.round(longPnL * 100) / 100).toFixed(2);
            let shortPnL = ((priceIn-priceOut)*executedQty)
            shortPnL= (Math.round(shortPnL * 100) / 100).toFixed(2);

            console.log(`longPnL=${longPnL}`)
            console.log(`shortPnL=${shortPnL}`)

            if (props.tradeData["applicantTrade"]["tradeType"]==="long"){
                markers.push({
                    time: timeIn,
                    position: 'belowBar',
                    // color: 'lime',
                    color: 'yellow',
                    shape: 'arrowUp',
                    text: 'Long @ $' + Math.floor(priceIn),
                });

                markers.push({
                    time: timeOut,
                    position: 'aboveBar',
                    // color: 'red',
                    color: 'yellow',
                    shape: 'arrowDown',
                    text: 'Close Trade @ $' + Math.floor(priceOut),
                });

                if (longPnL>0){
                    markers.push({
                            time: timeOut,
                            position: 'aboveBar',
                            color: 'lime',
                            shape: 'circle',
                            text: `Profit: $${longPnL}`,
                    })
                }else{
                    markers.push({
                        time: timeOut,
                        position: 'aboveBar',
                        color: 'white',
                        shape: 'circle',
                        text: `Loss: $${longPnL}`,
                    })
                }
                

                myPriceLine = {
                    price: priceIn,
                    color: 'lime',
                    lineWidth: 2,
                    lineStyle: 2, // LineStyle.Dashed
                    axisLabelVisible: true,
                    title: 'Long',
                };
                series.createPriceLine(myPriceLine);
                
                myPriceLine = {
                    price: priceOut,
                    color: 'red',
                    lineWidth: 2,
                    lineStyle: 2, // LineStyle.Dashed
                    axisLabelVisible: true,
                    title: 'Close Trade',
                };
    
                series.createPriceLine(myPriceLine);                
            }else{
                markers.push({
                    time: timeIn ,
                    position: 'aboveBar',
                    // color: 'red',
                    color: 'yellow',
                    shape: 'arrowDown',
                    text: 'Short @ ' + Math.floor(priceIn),
                });

                markers.push({
                    time: timeOut ,
                    position: 'belowBar',
                    // color: 'lime',
                    color: 'yellow',
                    shape: 'arrowUp',
                    text: 'Close Trade @ ' + Math.floor(priceOut),
                });

                if (shortPnL>0){
                    markers.push({
                            time: timeOut,
                            position: 'aboveBar',
                            color: 'lime',
                            shape: 'circle',
                            text: `Profit: $${shortPnL}`,
                    })
                }else{
                    markers.push({
                        time: timeOut,
                        position: 'aboveBar',
                        color: 'white',
                        shape: 'circle',
                        text: `Loss: $${shortPnL}`,
                    })
                }

                myPriceLine = {
                    price: priceIn,
                    color: 'red',
                    lineWidth: 2,
                    lineStyle: 2, // LineStyle.Dashed
                    axisLabelVisible: true,
                    title: 'Short',
                };
                series.createPriceLine(myPriceLine);
                
                myPriceLine = {
                    price: priceOut,
                    color: 'lime',
                    lineWidth: 2,
                    lineStyle: 2, // LineStyle.Dashed
                    axisLabelVisible: true,
                    title: 'Close Trade',
                };
    
                series.createPriceLine(myPriceLine);                
            }
            
            series.setMarkers(markers);

            // hide price line
            series.applyOptions({
                lastValueVisible: false,
                priceLineVisible: false,
            });


            chart.timeScale().fitContent();        
            return () => [chart.remove()]
        } // end of [if(props.tradeData)] check
    // }, [])
    }, [activePage])

    

    return <div ref={chartContainerRef}></div>
};

export default CandleStick2;