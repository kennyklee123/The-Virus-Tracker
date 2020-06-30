import React from 'react';
import CountUp from 'react-countup';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import cx from 'classnames';//allows us to have multiple classNames
import styles from './Cards.module.css';

/*all that data comes from destructuring the prop that is passed in (data) into the parts we need
  Grid is a container that grabs all the other cards and provides a basic styling
  Card component is going to be our grid.
  Tyography is used for texts like paragraph, heading, etc
  XS is for mobile devices, md is for medium screens, 12 and 3 are the spacing we want it to take
  */
const infoCards = ({data: { confirmed, recovered, deaths, lastUpdate }}) => {
    //the first object is empty and we check if it is confirmed or not
    //if it is not confirmed we cant do anything yet so I return loading
    if(!confirmed){
        return 'Loading ...'
    }
    return (
        <div className = {styles.container}>
             <Grid container spacing = {3} justify="center">
                <Grid item component = {Card} xs = {12} md = {3} className = {cx(styles.card, styles.infected)}>
                    <CardContent>
                        <Typography color ="textSecondary" gutterBottom>Infected</Typography>
                        <Typography variant= "h5">
                            <CountUp start={0} end = {confirmed.value} duration={2.5} separator="," />      
                        </Typography>
                        <Typography colr = "textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2">Current number of active cases of COVID-19</Typography>
                    </CardContent>
                </Grid>
                <Grid item component = {Card} xs = {12} md = {3} className = {cx(styles.card, styles.recovered)}>
                    <CardContent>
                        <Typography color ="textSecondary" gutterBottom>Recovered</Typography>
                        <Typography variant= "h5">
                            <CountUp start={0} end = {recovered.value} duration={2.5} separator="," /> 
                        </Typography> 
                        <Typography colr = "textSecondary">{new Date(lastUpdate).toDateString()}</Typography> 
                        <Typography variant="body2">Current number of recovered cases from COVID-19</Typography>
                    </CardContent>
                </Grid>
                <Grid item component = {Card} xs = {12} md = {3} className = {cx(styles.card, styles.deaths)}>
                    <CardContent>
                        <Typography color ="textSecondary" gutterBottom>Deaths</Typography>
                        <Typography variant= "h5">
                            <CountUp start={0} end = {deaths.value} duration={2.5} separator="," /> 
                        </Typography> 
                        <Typography colr = "textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2">Current total of deaths caused by COVID-19</Typography>
                    </CardContent>
                </Grid>
             </Grid>
        </div>     
    )
}

export default infoCards;