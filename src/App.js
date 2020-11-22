import React, { Component } from 'react'
import "react-tabs/style/react-tabs.css";
import FormPage from './FormPage'
import {BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom'
import axios from "axios";


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    checkAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
)

const checkAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
}

class Home extends Component{
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      message: '',
      email: '',
      password: '',
      checking: false,
    };
    this.handleSubmits = this.handleSubmits.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    this.props.history.push("/FormPage");
}

  home = () => {checkAuth.authenticate(() => {this.setState(() => ({checking: true}))
  })}

  handleChange(event) {
    const inputValue = event.target.value;
    const stateField = event.target.name;
    this.setState({
      [stateField]: inputValue,
    });
  }

  async handleSubmits(event) {
    event.preventDefault();
    const { name, message } = this.state;
    await axios.post(
      'https://zopatw7dn8.execute-api.us-east-2.amazonaws.com/default/LoginWriteSeverless',
      {  key1: `${name}`, key2: `${message}` }
    );
  }

  async handleSubmitLogin(event) {
    event.preventDefault();
    axios.get('https://itqx5sskv4.execute-api.us-east-2.amazonaws.com/default/LoginReadSeverless')
      .then((response) => {
        response.data.Items.map((person, index) => (
          person.Username === this.state.email ? (person.Password === this.state.password ? this.home() : console.log("no")) : console.log("no")
      ));
      response.data.Items.map((person, index) => (
        person.Password === this.state.password ? {checkPass : 1} : console.log("no")
    ))
    console.log(response.data.Items[0].Password)
      })
    }

  render() {
    const { checking } = this.state

    if (checking === true) {
      return <Redirect to='./FormPage' />
    }
    return (
      <div>
        <p>Inscription</p>
        <form name="test1" onSubmit={this.handleSubmits}>
          <label>Email :</label>
          <input
            type="email"
            name="name"
            onChange={this.handleChange}
            value={this.state.name}
          />


          <label>Password:</label>
          <input
            type="password"
            name="message"
            onChange={this.handleChange}
            value={this.state.message}
          />

          <button type="submit">Send</button>
        </form>

        <p>Connexion</p>
        <form name="test2" onSubmit={this.handleSubmitLogin}>
          <label>Email :</label>
          <input
            type="email"
            name="email"
            onChange={this.handleChange}
            value={this.state.email}
          />


          <label>Password:</label>
          <input
            type="password"
            name="password"
            onChange={this.handleChange}
            value={this.state.password}
          />

          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}


export default class App extends Component {
  render() {
    return (
        <div>

            <div className="container">
                <div>
                    <Router>
                        <div>
                            <Route exact path="/" component={Home} />
                            <PrivateRoute path="/FormPage" component={FormPage} />
                        </div>
                    </Router>
                </div>
            </div>
        </div>
    );
}
}
