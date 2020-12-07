import React, { Component } from 'react'
import "react-tabs/style/react-tabs.css";
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import { Paper, Grid, TextField, FormControlLabel, Checkbox, Container } from '@material-ui/core';
import up from './image/up.png'
import down from './image/down.png'
import Chart from 'react-apexcharts'
import { Alert } from '@material-ui/lab';

export default class DynamicForm extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        ds18b20: 0,
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
            text: 'History of the External Temperature',
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

  componentDidMount() {
    this.interval = setInterval(() => this.ds18b20Temp(), 5000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentWillMount() {
    this.ds18b20Temp();
  }

  ds18b20Temp() {
      axios.get('https://sc9uew29mj.execute-api.us-east-2.amazonaws.com/default/get-info')
      .then((response) => {
     this.setState( {
        stock: response.data.Items,
        ds18b20: response.data.Items.pop().Payload.ds18b20
       } )
      })
      .catch((err) => {
      console.log(err);
      });
//      console.log(this.state.ds18b20)
      var stock1 = [];
     var stock2 = [];
     var i = 0;
      this.state.stock.map((filterItem) => {
        return( 
        stock1[i] = filterItem.Payload.ds18b20,
        stock2[i] = i,
        i = i + 1
        )
        })
        var status =  [{
          name: "ds18b20",
          data: stock1
      }]
      this.setState({test: status})
//        console.log(stock1);
  }
  render() {
    //   const { handleSubmit, handleChange} = this.props
    return(
      <div>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              External Temperature
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
             The actual external Temperature outside the hive is
            </Typography>
            <Typography variant="h5" align="center" color="textPrimary" paragraph>
             {this.state.ds18b20} °C
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
            The best external temperature for a hive is 15 °C.
            </Typography>
            <Typography variant="h5" align="center" color="textPrimary" paragraph>
            {this.state.ds18b20 > 15 ? (
             <img src={down} alt="down" />
              ) : (
           <img src={up} alt="up" />
             )}
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
            {this.state.ds18b20 > 15 ? (
                <Alert severity="warning">You need {this.state.ds18b20 - 15} °C less to reach the recommanded temperature !</Alert>
              ) : (
                <Alert severity="warning">You need {15 - this.state.ds18b20} °C more to reach the recommanded temperature !</Alert>

             )}            </Typography>
            <Chart options={this.state.options} series={this.state.test} type="line" width={500} height={320} />
          </Container>
    </div>
  );
}
}