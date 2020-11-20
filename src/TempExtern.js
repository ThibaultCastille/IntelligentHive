import React, { Component } from 'react'
import "react-tabs/style/react-tabs.css";
import axios from "axios";

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
        other : 
        {this.state.ds18b20}
    </div>
  );
}
}