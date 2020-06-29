import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';

import styles from './Cards.module.css';

/*Grid is a container that grabs all the other cards and provides a basic styling
  Card component is going to be our grid.
  Tyography is used for texts like paragraph, heading, etc
  */
const Cards = (props) => {
    console.log(props);
    return (
        <div className = {styles.container}>
             <Grid container spacing = {3} justify="center">
                <Grid item component = {Card}>
                    <CardContent>
                        <Typography color ="textSecondary" gutterBottom>Infected</Typography>
                        <Typography variant= "h5">Data from API</Typography>
                        <Typography colr = "textSecondary">Date from API</Typography>
                        <Typography variant="body2">#Active Cases of rona</Typography>
                    </CardContent>
                </Grid>
             </Grid>
        </div>
       
    )
}

export default Cards;