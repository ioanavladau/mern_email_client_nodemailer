import React from 'react';
import axios from 'axios';
import userPlaceholderImg from '../assets/imgs/user-placeholder.jpg';


const API = 'http://localhost:8080/sent-emails';

export default class ViewEmailsPage extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            emails: null,
            isLoading: false
        };
      }

    componentDidMount() {
        this._isMounted = true;
        this.setState({ isLoading: true });

        axios.get(API)
        .then(res => {
            if (this._isMounted) {
                const emails = res.data;
                this.setState({ 
                    isLoading: false,
                    emails
                });
            }
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { isLoading, emails } = this.state;
        // if (isLoading) {
        //     return <p>Loading ...</p>;
        // }
        return (
            <div className="page">
                {/* {this.props.isUserLoggedIn ?  */}
                    <div>
                        <h1 className="page-title">View Sent Emails (Most Recent First)</h1>
                            <div>
                                {emails != null ? 
                                    emails.map(email => 
                                        <div key={email._id} className="email-card">
                                            <div className="email-card-left">
                                                <img src={userPlaceholderImg}/>
                                            </div>
                                            <div className="email-card-right">
                                                <p className="card-to-email">To: {email.to}</p>
                                                <p className="card-subject">Subject: {email.subject}</p>
                                                <p className="card-text">{email.text}</p>
                                            </div>
                                        </div>
                                        
                                    )   
                                    : <p>Loading emails...</p>
                                }
                            </div>
                    </div>
                    {/* : */}
                    {/* <div>Please authenticate in order to send an email.</div> */}
                {/* } */}
            </div>
        )
    }
}