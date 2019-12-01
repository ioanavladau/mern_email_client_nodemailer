import React from 'react';
import axios from 'axios';

const API = 'http://localhost:8080/sent-emails';

export default class ViewEmailsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            emails: null,
            isLoading: false
        };
      }

    componentDidMount() {
        this.setState({ isLoading: true });

        axios.get(API)
        .then(res => {
            const emails = res.data;
            this.setState({ 
                isLoading: false,
                emails
            });
        })
    }

    render() {
        const { isLoading, emails } = this.state;
        if (isLoading) {
            return <p>Loading ...</p>;
        }
        return (
            <div>
                <h1>View Emails Page</h1>
                <div>
                    {emails != null ? 
                        emails.map(email =>
                            <div key={email._id}>
                                {console.log(email)}
                                <p>To: {email.to}</p>
                                <p>Subject: {email.subject}</p>
                                <p>Message: {email.text}</p><br/>
                            </div>
                        )   
                        :     
                        "loading"
                    }
                </div>
            </div>
        )
    }
}