import React, {useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';


const Chart = () => {

    //initial value is an empty object and once we get the daily data it is automatically set
    const [dailyData,setDailyData] = useState([]); 

    //cant add async to useEffect normally, have to make a function inside of it instead
    useEffect(() => {
        const fetchAPI = async () =>{
            //populate daily data here from the promise returned
            setDailyData(await fetchDailyData()); 
        }
        fetchAPI(); //calls the function above^
    });

    
    const lineChart = (
    //if the daily data is available we return the line chart, else its null
    //We populate labels an array of all of the dates
    //There are only two datasets as the API doesnt provide daily data for recovered people, only confirmed & deaths
        dailyData.length //if the length is 0 it is falsy, if its like 1,2,3, its true
            ? (
                <Line
                    data = {{
                        labels: dailyData.map(( { date }) => date),
                        datasets: [{
                            data: dailyData.map(({confirmed }) => confirmed),
                            label: 'Infected',
                            borderColor: '#333ff',
                            fill: true,
                        }, {
                            data: dailyData.map(( {deaths}) => deaths),
                            label: 'Infected',
                            borderColor: '#333ff',
                            backgroundColor: 'rgba(255,0,0,0.5)',
                            fill: true,
                        }],
                    }}
                />) :null
    );
    return (
        <div className = {styles.container}>
            {lineChart};
        </div>
    )
}

export default Chart;