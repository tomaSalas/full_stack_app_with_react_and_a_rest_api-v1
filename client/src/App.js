
import './App.css';
import React, {Component} from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

// import components
import Courses from './components/courses';

//imports context
import withContext from "./Context";


const CoursesWithContext = withContext(Courses);


class App extends Component {
  
  render() {
    return (
      
        <BrowserRouter>
          <div>

            <Switch>
              <Route exact path='/' component={CoursesWithContext} />
            </Switch>
          </div>
        </BrowserRouter>
      
    );
  }
}


export default App;
