//after doing a little bit of reseach it is possible to modularize a form just like in the Data.js


import React from 'react';

export default (props) => {
    const {
        submit,
        cancel,
        submitText,
        elements, 
        errors
    } = props;

    // this fuctions prevent the default behavio of the form when call
    function handleSubmit(event) {
        event.preventDefault();
        submit();
      }
    
      function handleCancel(event) {
        event.preventDefault();
        cancel();
      }
    // display the erros on top of the form if the exist
    return (
        <main>
            <div className="wrap">
                <ErrorsDisplay errors={ errors } />
                <form onSubmit={ handleSubmit }>
                { elements() }
                    <button className="button" type="submit">{ submitText }</button>
                    <button className="button button-secondary" onClick={ handleCancel }>Cancel</button>
                </form>
            </div>
        </main>
    )
}

// display error 
function ErrorsDisplay({ errors }) {
    let errorsDisplay = null;
  
    if (errors.length) {
      errorsDisplay = (
        <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
                {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>
        </div>
        
      );
    }
  
    return errorsDisplay;
  }
