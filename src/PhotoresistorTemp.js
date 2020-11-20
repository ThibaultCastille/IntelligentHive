import React, { Component } from 'react'
import "react-tabs/style/react-tabs.css";
import axios from "axios";

export default class FormPage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      photo: 0,
     };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.PhotoresistorTemp(), 5000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }


  PhotoresistorTemp() {
      axios.get('https://sc9uew29mj.execute-api.us-east-2.amazonaws.com/default/get-info')
      .then((response) => {
     this.setState( {
      photo: response.data.Items.pop().Payload.photoresistor
       } )
      })
      .catch((err) => {
      console.log(err);
      });
      console.log(this.state.photo)
  }
  render() {
    return(
      <div>
        Light : 
        {this.state.photo}
    </div>
  );
}
}
