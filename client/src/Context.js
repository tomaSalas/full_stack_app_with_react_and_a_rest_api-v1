import React, { Component } from "react";
import Data from './Data';
import Cookies from 'js-cookie'

export const Context = React.createContext();

// class that helps avoid promp drilling 
export class Provider extends Component{
    constructor(){
        super();
        this.data = new Data();
    }
    state = {
        authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
        password: Cookies.getJSON("password") || null
    };

    render(){
        const {authenticatedUser, password} = this.state;

        // everthing in value can be share
        const value = {
        authenticatedUser,
        data: this.data,
        password,
        actions: {
          signIn: this.signIn,
          signOut: this.signOut
        }
        };

        return (
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>  
        );
    }

    //the fuctions below area adpated for treehouse courses
    signIn = async (emailAddress, password) => {
      const user = await this.data.getUser(emailAddress, password); //returns authenticated users name and username
      const pass = password;
      if(user !== null) {
        user.password = pass;
        this.setState(() => {
          return {
            authenticatedUser: user,
          }
        });
        //Set cookie
        Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1}); //creat cookie that stores the authenticated users data

      }
      return user;
    };

    //sign out - sign out user and delete cookie
    signOut = () => {
      this.setState({authenticatedUser: null}); //removes the name and username properties from state
    Cookies.remove('authenticatedUser');
    };
}

export const Consumer = Context.Consumer;


 export default function withContext(Component) {
    return function ContextComponent(props) {
      return (
        <Context.Consumer>
          {context => <Component {...props} context={context} />}
        </Context.Consumer>
      );
    }
  }
  
  //with Context auto connects the component passed to it to all actions and context changes

  