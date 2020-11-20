import React, { Component } from 'react'
import "react-tabs/style/react-tabs.css";
import FormPage from './FormPage'
import {BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom'
import styled from 'styled-components';
import {Button} from './styled_components/Button_styled';
import {Select} from './styled_components/Select_styled';
import {Input} from './styled_components/Input_styled';
import {HoverText} from './styled_components/HoverText_styled';

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
  state = {
    checking: false
  }
  home = () => {checkAuth.authenticate(() => {this.setState(() => ({checking: true}))
})
  }
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value });
  }

  handleSubmit(e) {

      this.props.history.push("/FormPage");
  }
  render() {
    const { username, password } = this.state;
    const { checking } = this.state

    if (checking === true) {
      return <Redirect to='/FormPage' />
    }

    return (
      <div>
        <div id="test1">
        <Button type="button" onClick={this.home}>Click to go to the form</Button>
        </div>
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

