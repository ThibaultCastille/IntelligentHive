import React, { useEffect, useState, Component } from 'react'
import "react-tabs/style/react-tabs.css";
import axios from "axios";
import _, { transform } from "lodash";
import Typography from '@material-ui/core/Typography';
import { Paper, Grid, TextField, FormControlLabel, Checkbox, Container} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Chart from 'react-apexcharts';


import { Drawer, Button, ButtonToolbar, Radio, RadioGroup,FormGroup } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import im_hive from './image/1S.png'
import photo_pres from './image/temp_int.png'

export default class Render2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      lm35: 0,
      stock: [],
      test: [],
      test1: [],
      stock1: [],
      raw: "Invisible",
    options: {
      chart: {

        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      fill: {
        colors: ['#FFA500', '#E91E63', '#9C27B0']
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        colors: ['orange'],
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
    show: false,
    name: "Day",
    month : [],
     };
     this.close = this.close.bind(this);
     this.toggleDrawer = this.toggleDrawer.bind(this);
     this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
//    this.close();
    this.lm35Temp();
    
  }

  componentDidMount() {
    this.interval = setInterval(() => this.lm35Temp(), 5000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  close() {
    this.setState({
      show: false
    });
    this.lm35Temp();
  }
  toggleDrawer() {
    this.setState({ show: true });
  }

  handleChange(event) {
    var inputValue = event.target.value;
    this.setState({
      show: false
    });
//    console.log(inputValue);
  }

  numAverage(a) {
    var b = a.length,
        c = 0, i;
    for (i = 0; i < b; i++){
      c += Number(a[i]);
    }
    return c/b;
  }

  value_chart(stock1) {
    var number = stock1.length;
    var new_raw = [];
    var new_raw1 = [];

    if (this.state.name === "Day")
      number = 12;
      
    for (var i = 0; i < number; i++) {
      new_raw[i] = "35";
    }
    var stock_raw = {
      name: "Recommanded",
      data: new_raw
    }
    var stock_raw_bar = {
      name: "Recommanded",
      data: new_raw
    }
    if (this.state.name === "Day") {
      var get = stock1.slice(Math.max(stock1.length - 12, 0));
      var status =  [{
        name: "lm35",
        data: get,
      }]
      if (this.state.raw === "Visible")
        status.push(stock_raw)
      this.setState({test: status})
    }
    if (this.state.name === "Month") {
      this.setState({month : []})
      var i,j,temparray,chunk = 6;
        for (i=0,j=stock1.length; i<j; i+=chunk) {
        temparray = stock1.slice(i,i+chunk);
        var moyenne = this.numAverage(temparray);
          this.state.month.push(moyenne);
      }
        number = this.state.month.length;
        for (var z = 0; z < number; z++) {
          new_raw1[z] = "35";
        }
        var stock_raw1 = {
          name: "Recommanded",
          data: new_raw1
        }
      var statusss =  [{
        name: "lm35",
        data: this.state.month
      }]
      if (this.state.raw === "Visible")
        statusss.push(stock_raw1)

      this.setState({test: statusss})
    }
    if (this.state.name !== "Day" && this.state.name !== "Month") {
      var statuss =  [{
        name: "lm35",
        data: stock1,
      }]
      if (this.state.raw === "Visible")
      statuss.push(stock_raw_bar)

      this.setState({test: statuss})
    }
  }

  lm35Temp() {
      axios.get('https://sc9uew29mj.execute-api.us-east-2.amazonaws.com/default/get-info')
      .then((response) => {
//        console.log(response)
     this.setState( {
       stock: response.data.Items.sort((a, b) => a.Row - b.Row),
      lm35: response.data.Items.sort((a, b) => a.Row - b.Row)[response.data.Items.length - 1].Payload.lm35
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
        stock1[i] = filterItem.Payload.lm35,
        stock2[i] = i,
        i = i + 1
        )
              })
      this.value_chart(stock1);
  }

  render() {
    //   const { handleSubmit, handleChange} = this.props
    return(
      <div>
        <Drawer
          show={this.state.show}
          onHide={this.close}
          size={"xs"}
        >
          <Drawer.Header>
            <Drawer.Title>Option</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
          Chart Option :
          <FormGroup controlId="radioList">
            <RadioGroup name="radioList" inline appearance="picker" value={this.state.name} onChange={(value) => {
      this.setState({name: value}); }}>
              <Radio value="Day">Last 24 hours</Radio>
              <Radio value="Month">Last 30 days</Radio>
              <Radio value="All">All</Radio>
            </RadioGroup>
          </FormGroup>
          <br></br>
          Chart Option :
          <FormGroup controlId="radioList">
            <RadioGroup name="radioList" inline appearance="picker" value={this.state.raw} onChange={(value) => {
      this.setState({raw: value}); }}>
              <Radio value="Invisible">Simple Chart</Radio>
              <Radio value="Visible">Show Recommanded</Radio>
            </RadioGroup>
          </FormGroup>
  
          </Drawer.Body>
          <Drawer.Footer>
            <Button onClick={this.close} appearance="primary">Confirm</Button>
            <Button onClick={this.close} appearance="subtle">Cancel</Button>
          </Drawer.Footer>
        </Drawer>

        <Container maxWidth="sm">
        <ButtonToolbar>
          <Button onClick={this.toggleDrawer}>⚙️</Button>
        </ButtonToolbar>

            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            <img src={photo_pres} className="photos_youtube" width="150px" height="150px"  alt="logopng"/>
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
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
            {this.state.lm35 > 35 ? (
                <Alert severity="warning" icon={false}> <img src={im_hive} className="photos_youtube" width="60px" height="60px"  alt="logopng"/>You need {this.state.lm35 - 35} °C less to reach the recommanded temperature  !</Alert>
              ) : (
                <Alert severity="warning" icon={false} > <img src={im_hive} className="photos_youtube" width="60px" height="60px"  alt="logopng"/>
                     You need {35 - this.state.lm35} °C more to reach the recommanded temperature !</Alert>
             )}            </Typography>
          </Container>
          {this.state.name === "Day" ? (
                 <Chart options={this.state.options} series={this.state.test} type="line" width={430} height={320} />
              ) : (
                this.state.name === "Month" ? (
                  <Chart options={this.state.options} series={this.state.test} type="bar" width={430} height={321} />
               ) : (
                <Chart options={this.state.options} series={this.state.test} type="bar" width={430} height={322} />
              )
             )}
    </div>
  );
}
}