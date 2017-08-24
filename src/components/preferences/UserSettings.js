import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'reactstrap';

const UserSettings = props => {
  const { handleSubmit } = props;
  return(
    <form onSubmit={handleSubmit}>
      <div>
        <label> Password </label>
        <div>
          <Field
            name="password"
            component="input"
            type="password"
            placeholder="password"
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
