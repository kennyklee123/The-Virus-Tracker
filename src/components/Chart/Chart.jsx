import React, {useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

//the two parameters data and country are used for the bar chart
const Chart = ({data: { confirmed, deaths, recovered }, country}) => {

    //initial value is an empty object and once we get the daily data it is automatically set
    const [dailyData,setDailyData] = useState([]); //used only for the global chart

    //cant add async to useEffect normally, have to make a function inside of it instead
    // the empty array is needed to make the useEffect act like a componentDidmount so it only happens once
    useEffect(() => {
        const fetchAPI = async () =>{
            //populate daily data here from the promise returned
            setDailyData(await fetchDailyData()); 
        }
        fetchAPI(); //calls the function above^
    }, []);

    
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
                            borderColor: '#3333ff',
                            fill: true,
                        }, {
                            data: dailyData.map(( {deaths}) => deaths),
                            label: 'Infected',
                            borderColor: 'red',
                            backgroundColor: 'rgba(255,0,0,0.5)',
                            fill: true,
                        }],
                    }}
                />) :null
    );
    console.log(confirmed, deaths, recovered);
    const barChart = (
        //we have two {{}} in data as the first makes it dynamic and the second pair opens the object
        //labels is static since there will only be 3 columns
        //datasets is an array of only one object
        //the api was being weird when trying to display data, ended up needing to add .value to confirmed, deaths,recovered as it was in a weird object
        confirmed
            ?(
                <Bar
                    data = { {
                        labels: ['Infected', 'Recovered', 'Deaths'],
                        datasets: [{
                            label: 'People',
                            backgroundColor: [
                                `rgba(0,0,255, 0.5)`,
                                `rgba(0,255,0, 0.5)`,
                                `rgba(255,0,0, 0.5)`,                              
                            ],
                            data: [confirmed.value, recovered.value, deaths.value] 
                        }]
                    }}
                    options = {{
                        legend: { display: false},
                        title: { display: true, text: `Current state in ${country}`},
                    }}
                 />
            ) : null
    );
    //if there is a specified country it shows a barChart, else we do the lineChart
    return (
        <div className = {styles.container}>
            {country ? barChart: lineChart}
        </div>
    )
}

export default Chart;