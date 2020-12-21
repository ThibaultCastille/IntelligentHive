import React, { Component } from 'react'
import "react-tabs/style/react-tabs.css";
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import { Paper, Grid, TextField, FormControlLabel, Checkbox, Container } from '@material-ui/core';
import up from './image/up.png'
import down from './image/down.png'
import Chart from 'react-apexcharts'
import { Alert } from '@material-ui/lab';
import { Drawer, Button, ButtonToolbar, Radio, RadioGroup,FormGroup } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

export default class DynamicForm extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        ds18b20: 0,
        stock: [],
        test: [],
        show: false,
        name: "Day",
        month : [],
        raw: "Invisible",
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
     this.close = this.close.bind(this);
     this.toggleDrawer = this.toggleDrawer.bind(this);
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

  close() {
    this.setState({
      show: false
    });
    this.ds18b20Temp();
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
    var number = stock1.length;
    var new_raw = [];
    var new_raw1 = [];

    if (this.state.name === "Day")
      number = 12;
      
    for (var i = 0; i < number; i++) {
      new_raw[i] = "15";
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
        name: "ds18b20",
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
          new_raw1[z] = "15";
        }
        var stock_raw1 = {
          name: "Recommanded",
          data: new_raw1
        }
      var statusss =  [{
        name: "ds18b20",
        data: this.state.month
      }]
      if (this.state.raw === "Visible")
        statusss.push(stock_raw1)

      this.setState({test: statusss})
    }
    if (this.state.name !== "Day" && this.state.name !== "Month") {
      var statuss =  [{
        name: "ds18b20",
        data: stock1,
      }]
      if (this.state.raw === "Visible")
      statuss.push(stock_raw_bar)

      this.setState({test: statuss})
    }
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
      this.value_chart(stock1);
//        console.log(stock1);
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
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
            {this.state.ds18b20 > 15 ? (
                <Alert severity="warning">You need {this.state.ds18b20 - 15} °C less to reach the recommanded temperature !</Alert>
              ) : (
                <Alert severity="warning">You need {15 - this.state.ds18b20} °C more to reach the recommanded temperature !</Alert>

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