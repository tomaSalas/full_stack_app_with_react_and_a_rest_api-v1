import React, {Component} from 'react';


export default class Courses extends Component{

    state = {
        courses: []
    }
    
    componentDidMount(){
        this.courses();
    }

    courses = () => {
        // use the prop in context to get to data where the courses api is
        this.props.context.data.getCourses()
        .then((data) => {
            this.setState({courses: data})  
        })
        .catch(err =>
            {
                console.log(err);
            }
            );
    }
    // mapping all elments in the array, finally last element add the course create
    render() {

        return(
            <div className="wrap main--grid">
                {this.state.courses.map(course => {
                    return (
                        <a className="course--module course--link" key={course.id} href={`course/${course.id}`}>
                            <h2 className="course--label">Course</h2>
                            <h3 className="course--title">{course.title}</h3>
                        </a>  
                    )
                })}
                <a className="course--module course--add--module" href="course/create">
                    <span className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                        New Course
                    </span>
                </a>
            </div>
        )
    }
}