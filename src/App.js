import React, { Component } from 'react'
import "react-tabs/style/react-tabs.css";
import FormPage from './FormPage'
import {BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom'
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
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import './App.css';
import image1 from './image/test4'
import image2 from './image/test5.jpg'
import image3 from './image/test3.png'

const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const properties = {
  duration: 3000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true
}


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

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  async handleSubmits(event) {
  //  event.preventDefault();
  console.log(this.state.name);
    const { name, message } = this.state;
    await axios.post(
      'https://zopatw7dn8.execute-api.us-east-2.amazonaws.com/default/LoginWriteSeverless',
      {  key1: `${name}`, key2: `${message}` }
    );
  }

  async handleSubmitLogin(event) {
//    event.preventDefault();
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
    const classes = withStyles();
//    const [modalStyle] = React.useState(getModalStyle);
  //  const [open, setOpen] = React.useState(false);
  
    if (checking === true) {
      return <Redirect to='./FormPage' />
    }
    return (
      <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Inelligent Hive
          </Typography>
          <Popup
    trigger={<Button color="inherit">Login</Button>}
    modal
    nested
  >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> Login </div>
        <div className="content">
                <div className={classes.margin}>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item md={true} sm={true} xs={true}>
                        <TextField id="username" label="Username" type="email" defaultValue={this.state.email}
        onChange={event => {
          const { value } = event.target;
          this.setState({ email: value });
        }}
         fullWidth autoFocus required />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item md={true} sm={true} xs={true}>
                        <TextField id="Password" label="Password" type="password" defaultValue={this.state.password}
        onChange={event => {
          const { value } = event.target;
          this.setState({ password: value });
        }}
         fullWidth autoFocus required />

                        </Grid>
                    </Grid>
                    <Grid container alignItems="center" justify="space-between">
                        <Grid item>
                            <FormControlLabel control={
                                <Checkbox
                                    color="primary"
                                />
                            } label="Remember me" />
                        </Grid>
                        <Grid item>
                            <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button>
                        </Grid>
                    </Grid>
                    <Grid container justify="center" style={{ marginTop: '10px' }}>
                        <Button variant="outlined" color="primary" style={{ textTransform: "none" }} onClick={() => { this.handleSubmitLogin() }}>Login</Button>
                    </Grid>
                </div>
        </div>
      </div>
    )}
  </Popup>
  <Popup
    trigger={<Button color="inherit">Register</Button>}
    modal
    nested
  >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> Register </div>
        <div className="content">
                <div className={classes.margin}>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="username" label="Username" type="email" defaultValue={this.state.name}
        onChange={event => {
          const { value } = event.target;
          this.setState({ name: value });
        }}
         fullWidth autoFocus required />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="username" label="Password" type="password" defaultValue={this.state.message}
        onChange={event => {
          const { value } = event.target;
          this.setState({ message: value });
        }}
        fullWidth required />
                        </Grid>
                    </Grid>
                    <Grid container justify="center" style={{ marginTop: '10px' }}>
                        <Button variant="outlined" color="primary" style={{ textTransform: "none" }} onClick={() => { this.handleSubmits() }}>Register</Button>
                    </Grid>
                </div>
        </div>
      </div>
    )}
  </Popup>
        </Toolbar>
      </AppBar>
      <div className="container">
          <header className="jumbotron">
          <Slide {...properties}>
                <div className="each-slide">
                    <div style={{ 'backgroundImage': `url(${image1})` }}>
                    </div>
                </div>
                <div className="each-slide">
                    <div style={{ 'backgroundImage': `url(${image2})` }}>
                    </div>
                </div>
                <div className="each-slide">
                    <div style={{ 'backgroundImage': `url(${image3})` }}>
                    </div>
                </div>
            </Slide>
            </header>
        </div>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              IntelligentHive
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
             IntelligentHive is a ProjectMaker. The goal of this project is to make a website that contains in real time all the important information of your hive. For this, we use amazon tools (AWS).
            </Typography>
          </Container>
        </div>
      </div>
    );
  }
}

export default class App extends Component {
  render() {
//    const classes = withStyles();
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
