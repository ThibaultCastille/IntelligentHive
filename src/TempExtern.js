import React, { Component } from 'react'
import "react-tabs/style/react-tabs.css";
import axios from "axios";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Paper, Grid, TextField, FormControlLabel, Checkbox, Container } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import Modal from '@material-ui/core/Modal';
import up from './image/up.png'
import down from './image/down.png'

export default class DynamicForm extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        ds18b20: 0,
     };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.ds18b20Temp(), 5000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }


  ds18b20Temp() {
      axios.get('https://sc9uew29mj.execute-api.us-east-2.amazonaws.com/default/get-info')
      .then((response) => {
     this.setState( {
        ds18b20: response.data.Items.pop().Payload.ds18b20
       } )
      })
      .catch((err) => {
      console.log(err);
      });
      console.log(this.state.ds18b20)
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
                <p> You need {this.state.ds18b20 - 15} °C less to reach the recommanded temperature </p>
              ) : (
                <p> You need {15 - this.state.ds18b20} °C more to reach the recommanded temperature </p>
             )}            </Typography>

          </Container>
    </div>
  );
}
}