import React from 'react';
import { Field, reduxForm } from 'redux-form';

const PeopleForm = props => {
    const { handleSubmit } = props;
    return(
      <form onSubmit={handleSubmit}>
        <div>
        <label> Add a new Favorite User </label>
        <div>
          <Field
            name="User"
            component="input"
            type="text"
            placeholder="User"
            />
          </div>
        </div>
        <br/>
        <button type="submit">Submit</button>
      </form>
    );
  };

  export default reduxForm({
    form: 'simple',
  })(PeopleForm);
