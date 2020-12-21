import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import Render2 from './lmTemp';
import DynamicForm from './TempExtern';
import AutomationForm from './PhotoresistorTemp';
import Humidity from './humidity';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import logopng from './image/logo1.png'

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import sizing  from '@material-ui/system';

var cardStyle = {
  display: 'block',
  width: '24vw',
  transitionDuration: '0.3s',
  height: '45vw',
  marginRight: 16,
  float: "left",
}

export default class FormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
    };
  }

  render() {
    return (
      <div>
 <AppBar position="static"  style={{background: "orange"}}>
        <Toolbar>
        <img src={logopng} className="photos_youtube" width="75px" height="75px"  alt="logopng"/>
          <Typography variant="h6" >
            Intelligent Hive
          </Typography>
        </Toolbar>
      </AppBar>
      <br ></br>
      <Card style={cardStyle} >
      <CardContent>
     <Render2 />
      </CardContent>
    </Card>
    <Card style={cardStyle} >
      <CardContent>
     <AutomationForm />
      </CardContent>
    </Card>
    <Card style={cardStyle} >
      <CardContent>
     <DynamicForm />
      </CardContent>
    </Card>
    <Card style={cardStyle} >
      <CardContent>
     <Humidity />
      </CardContent>
    </Card>
      </div>
    );
  }
}
