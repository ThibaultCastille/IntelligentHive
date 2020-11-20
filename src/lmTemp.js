import React, { useEffect, useState, Component } from 'react'
import "react-tabs/style/react-tabs.css";
import axios from "axios";


export default class Render2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      lm35: 0,
     };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.lm35Temp(), 5000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }


  lm35Temp() {
      axios.get('https://sc9uew29mj.execute-api.us-east-2.amazonaws.com/default/get-info')
      .then((response) => {
     this.setState( {
      lm35: response.data.Items.pop().Payload.lm35
       } )
      })
      .catch((err) => {
      console.log(err);
      });
      console.log(this.state.lm35)
      return (this.state.lm35)
  }
  render() {
    //   const { handleSubmit, handleChange} = this.props
    return(
      <div>
        Temperature in the hive : 
        {this.state.lm35}
    </div>
  );
}
}