import React from 'react';
import EmailForm from '../components/EmailForm';


export default class SendEmailPage extends React.Component {
    render() {
        return (
            <div>
                <h1>Send Email Page</h1>
                <EmailForm />
            </div>
        )
    }
}