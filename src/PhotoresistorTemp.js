import React, { Component } from 'react'
import "react-tabs/style/react-tabs.css";
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import { Paper, Grid, TextField, FormControlLabel, Checkbox, Container } from '@material-ui/core';
import Chart from 'react-apexcharts';
import { Alert } from '@material-ui/lab';
import { Drawer, Button, ButtonToolbar, Radio, RadioGroup,FormGroup } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import im_hive from './image/1S.png'
import im_hive_valid from './image/2S.png'
import photo_pres from './image/photoresistor.png'

export default class FormPage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      photo: 0,
      stock: [],
      show: false,
      name: "Day",
      month : [],
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
          fill: {
            colors: ['#FFA500', '#E91E63', '#9C27B0']
          },
          stroke: {
            colors: ['orange'],
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
     this.close = this.close.bind(this);
     this.toggleDrawer = this.toggleDrawer.bind(this);
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

  close() {
    this.setState({
      show: false
    });
    this.PhotoresistorTemp();
  }
  toggleDrawer() {
    this.setState({ show: true });
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
    if (this.state.name === "Day") {
      var get = stock1.slice(Math.max(stock1.length - 12, 0));
      var status =  [{
        name: "photoresistor",
        data: get,
      }]
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
      var statusss =  [{
        name: "photoresistor",
        data: this.state.month
      }]
      this.setState({test: statusss})
    }
    if (this.state.name !== "Day" && this.state.name !== "Month") {
      var statuss =  [{
        name: "photoresistor",
        data: stock1,
      }]
      this.setState({test: statuss})
    }
  }

  PhotoresistorTemp() {
      axios.get('https://sc9uew29mj.execute-api.us-east-2.amazonaws.com/default/get-info')
      .then((response) => {
     this.setState( {
      stock: response.data.Items.sort((a, b) => a.Row - b.Row),
      photo: response.data.Items.sort((a, b) => a.Row - b.Row).pop().Payload.photoresistor
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
     this.value_chart(stock1);
  }
  render() {
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
             The actual photoresistor value is
            </Typography>
            <Typography variant="h5" align="center" color="textPrimary" paragraph>
             {this.state.photo}             {this.state.photo > 400 ? (
           <text>☀️</text>
              ) : (
                <text>☁️</text>
             )}
            </Typography>
        
              <Typography variant="h7" align="center" color="textSecondary" paragraph>
                Scale : <br></br>
                0 - 300 : Dark <br></br>
                300 - 500 : gloomy<br></br>
                500+ : light
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
            <br></br>
  
            {this.state.photo > 400 ? (
                <Alert severity="warning" icon={false}> <img src={im_hive} className="photos_youtube" width="60px" height="60px"  alt="logopng"/>The light is high, be careful with the temperature, it can damage the hive !</Alert>
              ) : (
                <Alert severity="warning" icon={false}> <img src={im_hive} className="photos_youtube" width="60px" height="60px"  alt="logopng"/> The light is really low, be careful if the hive is outside, it can rains!</Alert>
             )}            </Typography>
 
             {this.state.name === "Day" ? (
                 <Chart options={this.state.options} series={this.state.test} type="line" width={400} height={320} />
              ) : (
                this.state.name === "Month" ? (
                  <Chart options={this.state.options} series={this.state.test} type="bar" width={400} height={321} />
               ) : (
                <Chart options={this.state.options} series={this.state.test} type="bar" width={400} height={322} />
              )
             )}
          </Container>
    </div>
  );
}
}
