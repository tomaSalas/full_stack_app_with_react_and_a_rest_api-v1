import config from './Config'

// helper class that is subcribe to context

export default class Data{

    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        const url = config.apiBaseUrl + path;
      
        const options = {
          method,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        };
    
        if (body !== null) {
          options.body = JSON.stringify(body);
        }
    
        //check if account is require
        if(requiresAuth){
          // http encode credentials
          const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`); //btoa method creates a base-64 ACSII string from a string, separate each property with a semicolon
          options.headers['Authorization'] = `Basic ${encodedCredentials}`; //set authorization type to Basic followed by the enocdedCredentials
        }
        return fetch(url, options);
      }
    //GET protected routes
    async getUser(emailAddress, password){
        
        const response = await this.api(`/users`, 'GET', null, true, {emailAddress, password});
        if (response.status === 200) {
            return response.json().then(data => data);
        }
        else if (response.status === 401) {
            return null;
        }
        else {
            throw new Error();
        }
    }

    // creates a user and send it to the API
    async createUser(user){
        const response = await this.api('/users', 'POST', user);
        if (response.status === 201) {
            return [];
        }
        else if (response.status === 400) {
            return response.json().then(data => {
            return data.errors;
            });
        }
        else {
            throw new Error();
        }
    }

    // unprotected route that gets all the courses 
    async getCourses(){
        const response = await this.api(`/courses`, 'GET');
        if (response.status === 200) {
            return response.json().then(data => data);
        }
        else if (response.status === 401) {
            return null;
        }
        else {
            throw new Error();
        }
    }
    // unprotected route that gets a courses 
    async getCourse(courseId){
        const response = await this.api(`/courses/${courseId}`, 'GET');
        if (response.status === 200) {
            return response.json().then(data => data);
        }
        else if (response.status === 401) {
            return null;
        }
        else {
            throw new Error();
        }
    }
    //protected route creates a course 
    async createCourse(emailAddress, password, course){
        const response = await this.api(`/courses`, 'POST', course, true, {emailAddress, password});
        if (response.status === 201) {
            return [];
        }
        else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
                });
        }
        else {
            throw new Error();
        }
    }
    //updates route 
    async updateCourse(emailAddress, password, course){
        const response = await this.api(`/courses/${course.id}`, 'PUT', course, true, {emailAddress, password});
        if (response.status === 204) {
            return [];
        }
        else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
                });
        }
        else {
            throw new Error();
        }
    }
    //PUT route requires authentication
    async deleteCourse(courseId, emailAddress, password){
         const response = await this.api(`/courses/${courseId}`, 'DELETE', null, true, {emailAddress, password});
         if (response.status === 204) {
             return [];
         }
         else if (response.status === 400) {
             return response.json().then(data => {
                 return data.errors;
                 });
         }
         else {
             throw new Error();
         }
    }
    

}