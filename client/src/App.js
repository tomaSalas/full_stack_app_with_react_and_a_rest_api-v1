
import './App.css';
import React, {Component} from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

// import components
import Courses from './components/courses';
import CourseDetail from './components/CourseDetail';

import NotFound from './components/NotFound';

//imports context
import withContext from "./Context";


const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);


class App extends Component {
  
  render() {
    return (
      
        <BrowserRouter>
          <div>

            <Switch>
              <Route exact path='/' component={CoursesWithContext} />
              <Route path='/course/:id' component={CourseDetailWithContext} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      
    );
  }
}


export default App;
