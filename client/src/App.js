
import './App.css';
import React, {Component} from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

// import components
import Courses from './components/courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import NotFound from './components/NotFound';

//imports context
import withContext from "./Context";

//allow context
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);


class App extends Component {
  
  render() {
    return (
      
        <BrowserRouter>
          <div>

            <Switch>
              <Route exact path='/' component={CoursesWithContext} />
              <Route path='/course/:id' component={CourseDetailWithContext} />
              <Route path='/signin' component={UserSignInWithContext} />
              <Route path='/signup' component={UserSignUpWithContext} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      
    );
  }
}


export default App;
