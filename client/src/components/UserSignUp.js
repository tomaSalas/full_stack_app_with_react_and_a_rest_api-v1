import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//modularize a form
import Form from './Form';

export default class UserSignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmedPassword: '',
        errors: [],
    }
    render() {
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmedPassword,
            errors
        } = this.state;

        return (
            <div className="form--centered">
                    <h2>Sign Up</h2>
                    <Form 
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitText="Sign Up"
                        elements={() => (
                            <React.Fragment>
                                <label htmlFor="firstName">First Name</label>
                                <input id="firstName" name="firstName" type="text" value={firstName} onChange={this.change} />
                                <label htmlFor="lastName">Last Name</label>
                                <input id="lastName" name="lastName" type="text" value={lastName} onChange={this.change} />
                                <label htmlFor="emailAddress">Email Address</label>
                                <input id="emailAddress" name="emailAddress" type="email" value={emailAddress} onChange={this.change} />
                                <label htmlFor="password">Password</label>
                                <input id="password" name="password" type="password" value={password} onChange={this.change} />
                                <label htmlFor="confirmedPassword">Confirm Password</label>
                                <input id="confirmedPassword" name="confirmedPassword" type="password" value={confirmedPassword} onChange={this.change} />
                            </React.Fragment>
                        )}
                    />
                    <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
                </div>
        )
    }

    //Cheaking user validation with treehouse courses 
    change = (event) => {
        
        // track changes in input 
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState(() => {
          return {
            [name]: value
          };
        });
      }

    //Handle form submittal
    submit = () => {
        const {context} = this.props;
        const {
            firstName, lastName, emailAddress, password, confirmedPassword
        } = this.state;
        
        const user = {firstName, lastName, emailAddress, password, confirmedPassword};
        // if password matches
        if (password === confirmedPassword) {
            //create new user
            context.data.createUser(user)
            .then(errors => {
                // if any erros 
                if (errors.length) {
                    this.setState({errors});
                }
                else {
                    console.log(`${emailAddress} is successfully signed up!`);
                    context.actions.signIn(emailAddress, password) //signs in the user after signup
                    .then(() => {
                        this.props.history.push('/'); //redirects to home page
                    });
                }
            })
            .catch( () => {
                //handle rejected promises
                this.props.history.push('/error'); // push to history stack
            });
        }
        else {
            this.setState({errors: ['Passwords must match']})
        }
        
    }
    cancel = () => {
        this.props.history.push('/'); //redirects to home route
      }
}