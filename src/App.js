import React from 'react';

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';

import ronaImage from './images/image.png';
//when we have index files like ./api or components we don't need to specify it

/*
    I did not use a constructor as that is not always necessary. 
    App's state is initialized with an empty object called data.
    App has country as all the sub components will use that same country
*/

class App extends React.Component {
    state = {
        data : {},
        country: '',
    }
    //Makes a request to the fetchData
    async componentDidMount(){
        const fetchedData = await fetchData(); 
        //sets the state's data to what we just fetched 
        this.setState({ data: fetchedData}); 
    } 
    //This handles the country change and if they choose global, country will be an empty string
    //The api's fetchData handles whether a the country is empty or not
    
    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country); 
        this.setState({ data: fetchedData, country: country }); //updates both the data and country

    }

    render() {
        //destructer data here so we do not need to call this.state.data or this.state.country
        const { data, country } = this.state;
        //we pass data as a prop to our sub components
        
        return (
            <div className = {styles.container}>
                <img className = {styles.image} alt = "rona" src = {ronaImage} />
                <h2>I created this project during the Summer of Shipping using React, Material-UI, and Chart.js!</h2>
                <h2>All the information found here is fetched from John Hopkins University! Check out the code <a id = {styles.github} href="https://github.com/kennyklee123/The-Virus-Tracker">here</a></h2>
                <Cards data = {data} />
                <CountryPicker handleCountryChange = {this.handleCountryChange}/>
                <Chart data = {data} country = {country}/>
            </div>
        )
    }
}

export default App; 