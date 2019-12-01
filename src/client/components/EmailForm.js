import React from 'react';
import axios from 'axios';
// import ShakingError from './../components/ShakingError';

export default class EmailForm extends React.Component {
    constructor(){
        super();
        this.state = {
            toEmail: "",
            subject: "",
            message: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
       this.setState({[event.target.name]: event.target.value});
    }

    submit(){
        console.log(this.state.name, this.state.age);
    }

    handleSubmit(event) {
        event.preventDefault();

        axios.post('http://localhost:8080/send-email', {
            from: 'ioanav3796@gmail.com',
            to: this.state.toEmail,
            subject: this.state.subject,
            message: this.state.message
        })
        .then(function(response){
            console.log(response);
        })
    }

    render() {
       return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    To (email):
                    <input type="text" name='toEmail' value={this.state.toEmail || ''} onChange={this.handleChange} />
                </label>
                <label>
                    Subject:
                    <input type="text" name='subject' value={this.state.subject || ''} onChange={this.handleChange} />
                </label>
                <label>
                    Message:
                    <input type="text" name='message' value={this.state.message || ''} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
       )
   }
}