import React, { useEffect, useState, Component } from 'react'
import "react-tabs/style/react-tabs.css";
import axios from "axios";
import _, { transform } from "lodash";
import Typography from '@material-ui/core/Typography';
import { Paper, Grid, TextField, FormControlLabel, Checkbox, Container} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Chart from 'react-apexcharts'

import up from './image/up.png'
import down from './image/down.png'

export default class Render2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      lm35: 0,
      stock: [],
      test: [],
      test1: [],
      series: [{
        name: "lm35",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }],
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
        text: 'History of the Internal Temperature',
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
    this.lm35Temp();
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
//      console.log(this.state.lm35)
     // console.log(this.state.stock)
     var stock1 = [];
     var stock2 = [];
     var i = 0;
      this.state.stock.map((filterItem) => {
        return( 
        stock1[i] = filterItem.Payload.lm35,
        stock2[i] = i,
        i = i + 1
        )
              })
      var status =  [{
        name: "lm35",
        data: stock1
    }]
    this.setState({test: status})

//        console.log(stock1)
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
                <Alert severity="warning">You need {this.state.lm35 - 35} °C less to reach the recommanded temperature  !</Alert>
              ) : (
                <Alert severity="warning">You need {35 - this.state.lm35} °C more to reach the recommanded temperature !</Alert>
             )}            </Typography>
                     <Chart options={this.state.options} series={this.state.test} type="line" width={500} height={320} />
          </Container>
    </div>
  );
}
}