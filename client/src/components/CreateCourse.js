import React, {Component} from 'react';
import Form from './Form'

export default class CreateCourse extends Component {
    state = {
        title: '',
        description: '',
        estimatedTime: '',
        userId: '',
        materialsNeeded: '',
        errors: []
    }

    //below adapted for previous Treehouse project
    change = (event) => {
        //keeps track of all changes to data entered into the form
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState(() => {
          return {
            [name]: value
          };
        });
      }

    submit = () => {
        //access context and authenticated user information
        const {context} = this.props;
        const authUser = context.authenticatedUser;
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded
        } = this.state;
        const course = {title, description, estimatedTime, materialsNeeded, userId: authUser.id};
        console.log(course);
       
        context.data.createCourse(authUser.emailAddress, authUser.password, course)
        .then((errors)=>{
            //if there are errors from creating the user send errors to state
                //no errors mean user was created successfully
                if(errors.length){
                    this.setState({errors});
                }
                else {
                    console.log(`Course created!`);
                    this.props.history.push('/');
                }

        })
        .catch( () => {
            // if promeses gets rejected
            // go to the error page
            this.props.history.push('/error'); // push to history stack
        });
       
    }
    
    cancel = () => {
        this.props.history.push('/');
    }
    
    render()
   { 
    const {context} = this.props;
    const authUser = context.authenticatedUser;
    console.log(authUser);

    const {
        title,
        description,
        estimatedTime,
        materialsNeeded,
        errors
    } = this.state;

    //modified fromfrom markdown-js example
    const decriptionMarkdown = "Lorem ipsum";
    const materialsMarkdown = " Lorem impsun";
       
        return(
            <div className="wrap">
            

                    <Form 
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitText="Create Course"
                        elements={() => (
                            <div className="main--flex">
                                <div>
                                    <label htmlFor="title">Course Title</label>
                                    <input id="title" name="title" type="text" value={title} onChange={this.change}  />

                                    <p>By {authUser.firstName} {authUser.lastName}</p>

                                    <label htmlFor="description">Course Description</label>
                                    <textarea id="dDescription" name="description" placeholder= {decriptionMarkdown} value={description} onChange={this.change} ></textarea>
                                </div>
                                <div>
                                    <label htmlFor="estimatedTime">Estimated Time</label>
                                    <input id="estimatedTime" name="estimatedTime" type="text"  value={estimatedTime} onChange={this.change} />

                                    <label htmlFor="materialsNeeded">Materials Needed</label>
                                    <textarea id="materialsNeeded" name="materialsNeeded" placeholder={materialsMarkdown}value={materialsNeeded} onChange={this.change} ></textarea>
                                </div>
                            </div>
                        )}
                    />
               
            </div>
        )
    }

    
}

