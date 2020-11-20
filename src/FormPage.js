import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import Render2 from './lmTemp';
import DynamicForm from './TempExtern';
import AutomationForm from './PhotoresistorTemp';


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
          <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
            <TabList>
              <Tab >lm35</Tab>
              <Tab> Photoresistor </Tab>
              <Tab>Dynamique</Tab>
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
          </Tabs>
      </div>
    );
  }
}
