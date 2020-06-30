import React, {useState, useEffect} from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import styles from './CountryPicker.module.css';
import { fetchCountries } from '../../api';

const CountryPicker = ({handleCountryChange}) => {

    const [fetchedCountries, setFetchedCountries] = useState([]);

    //use effect takes a callback and if there are parameters, it only activates when those change
    useEffect( () => {
        const fetchAPI = async () => {
            setFetchedCountries(await fetchCountries());
        }
        fetchAPI();
    }, [setFetchedCountries] );

    //when we map in react we need to provide a key, which is index
    //we map over the fC array to create options to view each of those countries and we need keys due to react
    //e.target.value contains the data for the country that is chosen
    return (
       <FormControl className = {styles.formControl}>
           <NativeSelect defaultValue = "" onChange={(e) => handleCountryChange(e.target.value) }>
                <option value = "">Global</option>
                {fetchedCountries.map((country, i) => <option key = {i} value = {country}>{country}</option>)}
           </NativeSelect>
       </FormControl>
    )
}

export default CountryPicker;
