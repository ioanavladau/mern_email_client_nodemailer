import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import SendEmailPage from './client/routes/SendEmailPage';
import ViewEmailsPage from './client/routes/ViewEmailsPage';
import Homepage from './client/routes/Homepage';

export default class App extends React.Component {
  handleUserData = (data) => {
    this.setState({ stateHere: "state" })
  }


  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/send-email">Send email</Link>
              </li>
              <li>
                <Link to="/view-emails">View emails</Link>
              </li>
            </ul>
          </nav>
  
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/send-email">
              <SendEmailPage />
            </Route>
            <Route path="/view-emails">
              <ViewEmailsPage />
            </Route>
            <Route path="/">
              <Homepage />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
  