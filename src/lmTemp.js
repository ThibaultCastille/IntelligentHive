import React, { useEffect, useState, Component } from 'react'
import "react-tabs/style/react-tabs.css";
import axios from "axios";
import _, { transform } from "lodash";
import Typography from '@material-ui/core/Typography';
import { Paper, Grid, TextField, FormControlLabel, Checkbox, Container } from '@material-ui/core';

import up from './image/up.png'
import down from './image/down.png'

export default class Render2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      lm35: 0,
      stock: [],
     };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.lm35Temp(), 10000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }


  lm35Temp() {
//    var stock = this.state.lm35,
      axios.get('https://sc9uew29mj.execute-api.us-east-2.amazonaws.com/default/get-info')
      .then((response) => {
        console.log(response)
     this.setState( {
       stock: response.data.Items,
      lm35: response.data.Items[response.data.Items.length - 1].Payload.lm35
       } )
      })
      .catch((err) => {
      console.log(err);
      });
      console.log(this.state.lm35)
      return (this.state.lm35)
  }
  render() {
    //   const { handleSubmit, handleChange} = this.props
    return(
      <div>
        <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Internal Temperature
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
             The actual Temperature in the hive is :
            </Typography>
            <Typography variant="h5" align="center" color="textPrimary" paragraph>
             {this.state.lm35} °C
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
            The best temperature for a hive is 35°C.
            </Typography>
            <Typography variant="h5" align="center" color="textPrimary" paragraph>
            {this.state.lm35 > 35 ? (
             <img src={down} alt="down" />
              ) : (
           <img src={up} alt="up" />
             )}
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
            {this.state.lm35 > 35 ? (
                <p> You need {this.state.lm35 - 35} °C less to reach the recommanded temperature </p>
              ) : (
                <p> You need {35 - this.state.lm35} °C more to reach the recommanded temperature </p>
             )}            </Typography>

          </Container>
    </div>
  );
}
}