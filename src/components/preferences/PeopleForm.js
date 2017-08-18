import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, formValueSelector} from 'redux-form';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import TextField from 'material-ui/TextField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'


const renderTextField = props => (
  <TextField hintText={props.label}
    floatingLabelText={props.label}
    errorText={props.touched && props.error}
    {...props}
  />
)

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
  form: 'simple',
})(PeopleForm);
