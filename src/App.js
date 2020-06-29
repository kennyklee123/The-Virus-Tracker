import React from 'react';

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';
//when we have index files like ./api or components we don't need to specify it

/*
    I did not use a constructor as that is not always necessary. 
    App's state is initialized with an empty object called data.
*/

class App extends React.Component {
    state = {
        data : {},
    }
    //We fetch the data here to be used 
    async componentDidMount(){
        const fetchedData = await fetchData(); 
        //sets the state's data to what we just fetched 
        this.setState({ data: fetchedData}); 

    }
    render() {
        //destructer data here so we do not need to call this.state.data 
        const { data } = this.state;
        //we pass data as a prop to our sub components
        
        return (
            <div className = {styles.container}>
                <Cards data = {data} />
                <CountryPicker />
                <Chart />
            </div>
        )
    }
}

export default App; 