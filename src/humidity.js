import React, { useEffect, useState, Component } from 'react'
import "react-tabs/style/react-tabs.css";
import axios from "axios";
import _, { transform } from "lodash";
import Typography from '@material-ui/core/Typography';
import { Paper, Grid, TextField, FormControlLabel, Checkbox, Container } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

export default class humidity extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      humidity: 50,
      stock: [],
     };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.lm35Temp(), 10000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentWillMount() {
      this.lm35Temp();
  }

  lm35Temp() {
//    var stock = this.state.lm35,
      axios.get('https://sc9uew29mj.execute-api.us-east-2.amazonaws.com/default/get-info')
      .then((response) => {
        console.log(response)
     this.setState( {
       stock: response.data.Items,
      humidity: 50
       } )
      })
      .catch((err) => {
      console.log(err);
      });
    //  console.log(this.state.lm35)
    //  return (this.state.lm35)
  }
  render() {
    //   const { handleSubmit, handleChange} = this.props
    return(
      <div>
        <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Humidity
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
             The actual humidity in the hive is :
            </Typography>
            <Typography variant="h5" align="center" color="textPrimary" paragraph>
             {this.state.humidity} %
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
            The best humidity in the nest of a healthy strong colony is between 50% and 60%.
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
            {this.state.humidity > 60 ? (
                <Alert severity="warning">You need {this.state.humidity - 50} % less to reach the recommanded humidity  !</Alert>
              ) : (
                this.state.humidity < 40 ? (
                    <Alert severity="warning">You need {50 - this.state.humidity} % more to reach the recommanded humidity  !</Alert>
                  ) : (
                    <p><Alert severity="success">You have the good % of humidity !</Alert> </p>
                 ) 
             )}            </Typography>

          </Container>
    </div>
  );
}
}