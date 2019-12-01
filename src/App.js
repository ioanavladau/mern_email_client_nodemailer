import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import './App.scss';
import SendEmailPage from './client/routes/SendEmailPage';
import ViewEmailsPage from './client/routes/ViewEmailsPage';
import Homepage from './client/routes/Homepage';

import { GoogleLogout } from 'react-google-login';

import { withStyles } from "@material-ui/core/styles";
import { AppBar } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navbar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    padding: '0 10vw'
  },
  links: {
    textDecoration: 'none',
    color: 'white'
  }
});

const responseGoogle = (response) => {
  console.log(response);
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isUserLoggedIn: false,
    };
  }

  redirectToHomepage = (response) => {
    this.setState({ isUserLoggedIn: false });
    console.log(response);
  }  
  
  handleUserData = (data) => {
    this.setState({ stateHere: "state" })
  }

  render() {
    const { classes } = this.props;
    const { isUserLoggedIn } = this.state;
    


    return (
      <Router>
        <div>
          <AppBar position="static" elevation={0}>
          { this.state.isUserLoggedIn === false && <Redirect to={{ pathname: "/homepage" }} /> }

            <Toolbar className={classes.navbar}>
              {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton> */}
              <Typography variant="h6" className={classes.title} >
                <Link to="/homepage" className={classes.links}>Home</Link>
              </Typography>
              <Typography variant="h6" >
                <Link to="/send-email" className={classes.links}>Send Email</Link>
              </Typography>
              <Typography variant="h6" >
                <Link to="/view-emails" className={classes.links}><Typography variant="h6" >View Sent Emails</Typography></Link>
              </Typography>
              <GoogleLogout
                clientId="554404536441-r7qao5lerl82kp24frdkit7cp7f6gnqn.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={this.redirectToHomepage}
                onFailure={responseGoogle}
              >
              </GoogleLogout>
            </Toolbar>
          </AppBar>
  
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            {/* <Route exact path="/send-email">
              { isUserLoggedIn ?  <SendEmailPage isUserLoggedIn={this.state.isUserLoggedIn}/> : <Homepage /> }
            </Route> */}
            <Route exact path="/send-email">
              <SendEmailPage isUserLoggedIn={this.props.isUserLoggedIn}/>
            </Route>
            <Route exact path="/view-emails">
              <ViewEmailsPage />
            </Route>
            <Route exact path="/homepage">
              <Homepage />
            </Route>
            <Route exact path="/" render={() => (
              <Redirect to="/homepage"/>
            )}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);

