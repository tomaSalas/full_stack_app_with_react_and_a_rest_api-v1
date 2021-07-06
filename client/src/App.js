
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  
  componentDidMount() {
    axios.get("http://localhost:5000/api/courses")
    .then((response) => {
      console.log(response);
      let data = response.data;
      console.log(data);
    })
    .catch(error => {
      console.log("Error fetching and parsing data", error);
    });
  }

  render() {
    return <h1>my Component has Mounted, Check the browser 'console' </h1>;
  }
}

export default App;
