import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'reactstrap';
import  './bootstrap.css';


const UserSettings = props => {
  const { onSubmit } = props;
  return(
    <form onSubmit={onSubmit}>
      <div>
        <label> Password </label>
        <div>
          <Field
            name="password"
            component="input"
            type="password"
            placeholder="password"
            className="form-control"
            />
        </div>
      </div>
      <br/>
      <Button color="primary" size="lg">Submit</Button>
    </form>
  );
};

export default reduxForm({
  form: 'UserForm',
})(UserSettings);
