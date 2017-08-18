import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, formValueSelector} from 'redux-form';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


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
