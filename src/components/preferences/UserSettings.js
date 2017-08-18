import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'reactstrap';

import { addPeople } from '../../actions';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';

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

export default userForm({
  form: 'simple',
})(UserSettings);
