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
 <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" >
            Inelligent Hive
          </Typography>
        </Toolbar>
      </AppBar>
          <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
            <TabList>
              <Tab >Internal Temperature</Tab>
              <Tab> Photoresistor </Tab>
              <Tab>External Temperature</Tab>
              <Tab>Humidity</Tab>
            </TabList>
            <TabPanel>
              <Render2 />
            </TabPanel>
            <TabPanel>
              <AutomationForm />
            </TabPanel>
            <TabPanel>
              <DynamicForm  />
            </TabPanel>
            <TabPanel>
              <Humidity  />
            </TabPanel>
          </Tabs>
      </div>
    );
  }
}
