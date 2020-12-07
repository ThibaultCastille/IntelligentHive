import React, { Component } from 'react'
import "react-tabs/style/react-tabs.css";
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import { Paper, Grid, TextField, FormControlLabel, Checkbox, Container } from '@material-ui/core';
import Chart from 'react-apexcharts';
import { Alert } from '@material-ui/lab';

export default class FormPage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      photo: 0,
      stock: [],
        test: [],
        options: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          title: {
            text: 'History of the Photoresistor Value',
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
        },
     };
  }

  componentWillMount() {
    this.PhotoresistorTemp();
  }

  componentDidMount() {
    this.interval = setInterval(() => this.PhotoresistorTemp(), 5000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }


  PhotoresistorTemp() {
      axios.get('https://sc9uew29mj.execute-api.us-east-2.amazonaws.com/default/get-info')
      .then((response) => {
     this.setState( {
      stock: response.data.Items,
      photo: response.data.Items.pop().Payload.photoresistor
       } )
      })
      .catch((err) => {
      console.log(err);
      });
      var stock1 = [];
      var stock2 = [];
      var i = 0;
       this.state.stock.map((filterItem) => {
         return( 
         stock1[i] = filterItem.Payload.photoresistor,
         stock2[i] = i,
         i = i + 1
         )
               })
       var status =  [{
         name: "photoresistor",
         data: stock1
     }]
     this.setState({test: status})
  }
  render() {
    return(
      <div>
            <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Light & Meteo Incidence
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
             The actual photoresistor value is
            </Typography>
            <Typography variant="h5" align="center" color="textPrimary" paragraph>
             {this.state.photo}
            </Typography>
            <Typography variant="h5" align="center" color="textPrimary" paragraph>
            {this.state.photo > 400 ? (
            <p>☀️</p>
              ) : (
                <p>☁️</p>
             )}
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
            {this.state.photo > 400 ? (
                <Alert severity="warning">The light is high, be careful with the temperature, it can damage the hive !</Alert>
              ) : (
                <Alert severity="warning">The light is really low, be careful if the hive is outside, it can rains!</Alert>
             )}            </Typography>
        <Chart options={this.state.options} series={this.state.test} type="line" width={500} height={320} />
          </Container>
    </div>
  );
}
}
