
import React from 'react';

class App extends React.Component {
  
  omponentDidMount() {
    const apiUrl = 'localhost:5000/api/courses';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => console.log('This is your data', data));

    console.log("end");
  }
  render() {
    return <h1>my Component has Mounted, Check the browser 'console' </h1>;
  }
}

export default App;
