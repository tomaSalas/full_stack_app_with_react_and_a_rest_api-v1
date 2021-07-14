import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown'
export default class CourseDetail extends Component {

    state = {
        course: {},
        user:{}
    }
    
    componentDidMount() {
        this.course();
    }

    CourseOptions = (courseId) => {
        
            return(
                <div>
                    <a className="button" href={`/course/${courseId}/update`}>Update Course</a>
                    <button className="button" onClick={this.delete}>Delete Course</button>
                    <a className="button button-secondary" href="/">Return to List</a>
                </div>
            );
       
    }
 
 // get courses using context
course = () => {
    this.props.context.data.getCourse(this.props.match.params.id)
    .then((data) => {
        //console.log(data)
       //extract data from object 
        this.setState({course: data, user: data.User});
               
    })
    .catch(err =>
        {

            this.props.history.push('/notfound');
        }
        );
}
//deletes a course
delete = () => {
    //confirm deletion
   if ( window.confirm("Are you sure you want to delete this course?" ))
   {
       //verify user can delete data
       const { context } = this.props;
       const authUser = context.authenticatedUser;
       const pass = context.password;
       const id = this.props.match.params.id;
        if ( authUser ) {
            context.data.deleteCourse(id, authUser.emailAddress, authUser.password)
            .then(() => {
            
                //redirect to home on successful deletion
                this.props.history.push('/');
            })
            .catch(() => {
            this.props.history.push('/error');
            });
        }
        else {
            this.props.history.push('/forbidden');
        }
   }
}

    render() {
        
        const data = this.state.course;
        const user = this.state.user;

        //getting data from context
        const { context } = this.props;
        const authUser = context.authenticatedUser;
        //place holder text
       let estimatedTime = "To be determine";
        if (data.estimatedTime) {
            estimatedTime = data.estimatedTime;
        }

        // if logging show course update and delete
        return(
            <main>
            <div className="actions--bar">
            <div className="wrap">
                {
                    authUser ?
                    this.CourseOptions(data.id)
                    :
                    <a className="button button-secondary" href="/">Return to List</a>  
                } 
             </div>
            </div>
            <div className="wrap">
            <h2>Course Detail</h2>
            <form>
                <div className="main--flex">
                    <div>
                        <h3 className="course--detail--title">Course</h3>
                        <h4 className="course--name">{data.title}</h4>
                        <p>{`${user.firstName} ${user.lastName}`}</p>

                        <ReactMarkdown>{data.description}</ReactMarkdown>
                    </div>
                    <div>
                        <h3 className="course--detail--title">Estimated Time</h3>
                        <p>{estimatedTime}</p>

                        <h3 className="course--detail--title">Materials Needed</h3>
                        <div className="course--detail--list">
                        {
                            data.materialsNeeded ?
                            <ReactMarkdown>{data.materialsNeeded}</ReactMarkdown>
                            :
                            <li>TBD or no materials needed</li>
                        }
                        </div>
                    </div>
                </div>
            </form>
        </div>
        </main>
        )

    }

   
}