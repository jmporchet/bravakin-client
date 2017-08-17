import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

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
        <button type="submit">Submit</button>
      </form>
    );
  };

  export default reduxForm({
    form: 'simple',
  })(UserSettings);
