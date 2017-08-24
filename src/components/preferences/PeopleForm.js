import React from 'react';
import {Field, reduxForm} from 'redux-form';
import { Button,  } from 'reactstrap';
import './bootstrap.css';

const PeopleForm = props => {
  const { handleSubmit } = props;
  return(
    <form onSubmit={handleSubmit}>
      <div>
        <label> Add a new Favorite User </label>
        <div>
          <Field
            name="User"
            component = 'input'
            type="text"
            className="form-control"
            placeholder="User"
            />
        </div>
      </div>
      <br/>
      <Button color="primary" size="lg">Submit</Button>
    </form>
  );
};


export default reduxForm({
  form: 'PeopleForm',
})(PeopleForm);
