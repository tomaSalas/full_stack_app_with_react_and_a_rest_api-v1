
import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import React, {Component} from 'react';


// import components
import Header from './components/Header';
import Courses from './components/courses';
import CourseDetail from './components/CourseDetail';
import CourseUpdate from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut' 
import CreateCourse from './components/CreateCourse';
import PrivateRoute from './PrivateRoute';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UndlandError from './components/UndlandError';

//imports context
import withContext from "./Context";

//allow context
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CourseUpdateWithContext = withContext(CourseUpdate);
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
              <PrivateRoute exact path="/course/create" component={CreateCourseWithContext} />
              <PrivateRoute exact path="/course/:id/update" component={CourseUpdateWithContext} />
              <Route path="/course/:id" component={CourseDetailWithContext} />
              <Route path="/signin" component={UserSignInWithContext} />
              <Route path="/signup" component={UserSignUpWithContext} />
              <Route path="/signout" component={UserSignOutWithContext} />
              <Route path="/signout" component={UserSignOutWithContext} />
              <Route path="/forbidden" component={Forbidden} />
              <Route path="/error" component={UndlandError} />

              <Route component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      
    );
  }
}


export default App;
