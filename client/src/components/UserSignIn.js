import React, { Component } from 'react';
import Form from './Form';

export default class UserSignIn extends Component {
    // tracking 3 states
    state = {
        emailAddress: '',
        password: '',
        errors: []
    }

    //using context to retrieve data
    // using Form component to keep userSignIn easier to debug
    render() {
        const { emailAddress, password, errors } = this.state;

        return(
            <div className="form--centered">
                <h2>Sign In</h2>
                <Form 
                    cancel={this.cancel}
                    submit={ this.submit }
                    errors={ errors }
                    submitText="Sign In"
                    elements={() => (
                        <React.Fragment>
                            <label htmlFor="emailAddress">Email Address</label>
                            <input id="emailAddress" name="emailAddress" type="email" value={emailAddress} onChange={this.change} />
                            <label htmlFor="password">Password</label>
                            <input id="password" name="password" type="password" value={password} onChange={this.change} />
                        </React.Fragment>
                    )}/>
            </div>
        );
    }
    // get the value input
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState(() => {
          return {
            [name]: value
          };
        });
      }

    submit = () => {
        const { context } = this.props;
        const { emailAddress, password } = this.state;
        context.actions.signIn(emailAddress, password)
        .then(user => {
          if (user === null){
            this.setState(() => {
              return{errors: ['Sign-in was unsuccessful, Check credentials']}
            });
          }
          else {
            this.props.history.push('/');
            console.log(`Congratulations! ${emailAddress} is now signed in!`)
          }
        })
        .catch(err => {
          console.log(err);
          this.props.history.push('/error');
        });
    }

    cancel = () => {
        this.props.history.push('/');
      }
}