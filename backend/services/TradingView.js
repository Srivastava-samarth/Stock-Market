export const formDataForTardingView = (historicalData) =>{
    const timeSeries = historicalData['Time Series (Daily'];
    const formattedData = Object.keys(timeSeries).map(data => {
        const dailyData = timeSeries(data);
        return {
            time:new Date(date).getTime()/1000,
            open:parseFloat(dailyData['1. open']),
            high:parseFloat(dailyData['2. high']),
            low: parseFloat(dailyData['3. low']),
            close: parseFloat(dailyData['4. close']),
            volume: parseInt(dailyData['5. volume'])
        };
    });

    return formattedData.reverse();
}