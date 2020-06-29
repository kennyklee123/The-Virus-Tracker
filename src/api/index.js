
import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

//async function returning the response of the api

export const fetchData = async () => {
    try {
        //destructed the response from the GET request so that we only get the data, then destructed data to only get the stats we need
        const { data: { confirmed, recovered, deaths, lastUpdate}} = await axios.get(url); 
        //originally stored the destructed info in an object but just returned it instead
        return { confirmed, recovered, deaths, lastUpdate}; 
        
    } catch ( error){

    }
}

export const fetchDailyData = async () => {
    try{
        const {data} = await axios.get(`${url}/daily`); //used a template string since we need to get daily data
        //we map over the data and for each dailyData we return an object
        const modifiedData = data.map((dailyData) => ({           
            date: dailyData.reportdate,
            deaths: dailyData.deaths.total,
            confirmed: dailyData.confirmed.total,
        }));
        return modifiedData;
        
    }catch(error) {

    }
}