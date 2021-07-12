
import './App.css';
import React, {Component} from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

// import components
import Header from './components/Header';
import Courses from './components/courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut' 
import CreateCourse from './components/CreateCourse';
import NotFound from './components/NotFound';

//imports context
import withContext from "./Context";

//allow context
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);
const CreateCourseWithContext = withContext(CreateCourse);



class App extends Component {
  
  render() {
    return (
      
        <BrowserRouter>
          <div>
          <HeaderWithContext />
            <Switch>
              <Route exact path="/" component={CoursesWithContext} />
              <Route exact path="/course/create" component={CreateCourseWithContext} />
              <Route path="/course/:id" component={CourseDetailWithContext} />
              <Route path="/signin" component={UserSignInWithContext} />
              <Route path="/signup" component={UserSignUpWithContext} />
              <Route path="/signout" component={UserSignOutWithContext} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      
    );
  }
}


export default App;
