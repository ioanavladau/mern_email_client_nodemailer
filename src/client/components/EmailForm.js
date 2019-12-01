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
                <div className="input-group">
                    <label>
                        <span>To (email):</span>
                        <input type="text" className="form-input" id="field-1" name='toEmail' value={this.state.toEmail || ''} onChange={this.handleChange} />
                    </label>
                    {/* <label for="field-1" className="input-meta input-label">Place Name</label> */}
                </div>
                <div className="input-group">
                    <label>
                        Subject:
                        <input type="text" className="form-input" name='subject' value={this.state.subject || ''} onChange={this.handleChange} />
                    </label>
                </div>
                <div className="input-group">
                    <label>
                        Message:
                        <input type="text" className="form-input" name='message' value={this.state.message || ''} onChange={this.handleChange} />
                    </label>
                </div>
                <input type="submit" className="submit" value="Submit" />
            </form>
       )
   }
}