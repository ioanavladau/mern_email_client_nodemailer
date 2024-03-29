import React from 'react';
import GoogleLogin from 'react-google-login';
import { Redirect, Link } from 'react-router-dom';

const responseGoogle = (response) => {
    console.log(response);
}

export default class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        //   isUserLoggedIn: false,
        //   user: {}
        };
        // this.handleLogin = this.handleLogin.bind(this)
    }

    redirectToSendEmailPage = (response) => {
        this.setState({ isUserLoggedIn: true });
        console.log(response);
    }

    render() {
        return (
            <div className="page page-with-background">
                { this.state.isUserLoggedIn === true ?
                    <Redirect to={{ 
                            pathname: "/send-email", 
                            state: { isUserLoggedIn: true } 
                        }} 
                    /> 
                    :
                    <div>
                        <h1>Hi there! Login with Google to send an email :)</h1>
                        <GoogleLogin
                            clientId="554404536441-r7qao5lerl82kp24frdkit7cp7f6gnqn.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={this.redirectToSendEmailPage}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                }
            </div>
        )
    }
}