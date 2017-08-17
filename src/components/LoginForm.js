import React from 'react';
import { Field, reduxForm } from 'redux-form';

const LoginForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label> Username </label>
        <div>
          <Field
            name="username"
            component="input"
            type="text"
            placeholder="username"
          />
        </div>
      </div>
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
      <button type="submit">Submit</button>
    </form>
  );
};

export default reduxForm({
  form: 'simple',
})(LoginForm);
