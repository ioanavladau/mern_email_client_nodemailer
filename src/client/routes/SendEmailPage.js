import React from 'react';
import EmailForm from '../components/EmailForm';


export default class SendEmailPage extends React.Component {

    // componentDidMount () {
        // const { isUserLoggedIn } = this.props.location.state;
        // this.setState({ isUserLoggedIn: true });
    // }

    render() {
        return (
            <div className="page">
                {/* {console.log("isUserLoggedIn", this.state.isUserLoggedIn)} */}
                {/* {this.props.location.state.isUserLoggedIn ? */}
                    <div className="email-form-container">
                        <h1 className="page-title">Send Email Page</h1>
                        <EmailForm />
                    </div> 
                    {/* :  */}
                    {/* <div>Please authenticate in order to send an email.</div> */}
                {/* } */}
            </div>
        )
    }
}